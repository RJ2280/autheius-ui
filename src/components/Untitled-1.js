import fs from 'fs/promises';
import process from 'process';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: path.resolve(process.cwd(), '../chimera-backend/.env') });

// --- Configuration ---
// Adjust this path if your UI project is in a different location relative to the backend.
const UI_PROJECT_PATH = path.resolve(process.cwd(), '../autheius-ui');
const DATA_DIR = path.join(UI_PROJECT_PATH, 'public/data');

// --- Gemini API Initialization ---
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in .env file.');
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function convertQuestionToMCQ(question, answer) {
  const prompt = `You are an AI assistant that creates educational materials.
    I have an open-ended question and its answer.
    Your task is to convert this into a multiple-choice question with four options.
    One of the options must be the correct answer provided. The other three should be plausible but incorrect distractors.
    The original question is: "${question}"
    The correct answer is: "${answer}"

    Please provide your output in a single, minified JSON object with the following structure: { "question": "...", "options": ["...", "...", "...", "..."], "answer": "..." }.
    Do not include any other text or formatting in your response.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Clean up potential markdown code fences
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error(`   - Error converting question: "${question}"`, error);
    return null;
  }
}

async function processQuizzes() {
  console.log('🤖 Starting AI-powered quiz generation...');
  const lessonDirs = await fs.readdir(DATA_DIR);

  for (const dirName of lessonDirs) {
    if (!dirName.startsWith('Lesson')) continue;

    const quizPath = path.join(DATA_DIR, dirName, 'quiz.json');
    try {
      const quizFile = await fs.readFile(quizPath, 'utf-8');
      const quiz = JSON.parse(quizFile);

      // Skip if it already looks like a multiple-choice quiz
      if (quiz.questions && quiz.questions[0]?.options) {
        console.log(`- Skipping ${dirName}: Already in multiple-choice format.`);
        continue;
      }

      console.log(`- Processing ${dirName}...`);
      const newQuestions = [];
      for (const q of quiz.questions) {
        const mcq = await convertQuestionToMCQ(q.question, q.answer);
        if (mcq) {
          newQuestions.push(mcq);
        }
        // Add a small delay to avoid hitting API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (newQuestions.length > 0) {
        const newQuiz = { ...quiz, questions: newQuestions };
        await fs.writeFile(quizPath, JSON.stringify(newQuiz, null, 2));
        console.log(`  ✅ Successfully converted ${dirName} to multiple-choice!`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`- Error processing ${quizPath}:`, error);
      }
    }
  }
  console.log('🎉 Quiz generation complete!');
}

processQuizzes();