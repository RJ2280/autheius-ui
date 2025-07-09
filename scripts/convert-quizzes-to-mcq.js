import fs from 'fs/promises';
import process from 'process';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from the backend's .env file
// This assumes you run the script from the root of the 'autheius-ui' directory.
dotenv.config({ path: path.resolve(process.cwd(), '../chimera-backend/.env') });

// --- Configuration ---
const UI_PROJECT_PATH = process.cwd();
const DATA_DIR = path.join(UI_PROJECT_PATH, 'public/data');

// --- Gemini API Initialization ---
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found. Make sure it is set in chimera-backend/.env');
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
      const newQuestions = await Promise.all(quiz.questions.map(q => convertQuestionToMCQ(q.question, q.answer)));

      const validNewQuestions = newQuestions.filter(Boolean);
      if (validNewQuestions.length > 0) {
        const newQuiz = { ...quiz, questions: validNewQuestions };
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

