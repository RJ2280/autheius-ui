import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'public/data');
const LESSONS_JSON_PATH = path.join(DATA_DIR, 'lessons.json');

// --- Placeholder Content ---
const placeholderContentMd = (title) => `# ${title}\n\nThis is the main content for ${title}. Add your markdown here.\n`;
const placeholderTutorialMd = (title) => `# ${title} - Tutorial\n\nThis is the tutorial for ${title}. Add your tutorial steps here.\n`;
const placeholderQuizJson = (title) => ({
  title: `Quiz for ${title}`,
  questions: [
    {
      question: `What is the main concept of "${title}"?`,
      answer: `The main concept is... (Replace with the actual answer for AI generation)`
    }
  ]
});
const placeholderMediaJson = () => ({
  youtubeId: "" // Placeholder for a YouTube video ID
});

async function generateLessons() {
  console.log('🚀 Generating lesson folders and placeholder files from lessons.json...');

  let lessons;
  try {
    const lessonsJson = await fs.readFile(LESSONS_JSON_PATH, 'utf-8');
    lessons = JSON.parse(lessonsJson);
    console.log(`- Found ${lessons.length} lesson definitions in lessons.json.`);
  } catch (error) {
    console.error(`❌ Error: Could not read or parse ${LESSONS_JSON_PATH}`);
    console.error(error);
    process.exit(1);
  }

  let lesson_count = 0;
  for (const lesson of lessons) {
    if (!lesson.id || !lesson.title) {
      console.log('⚠️ Skipping a lesson due to missing ID or title.');
      continue;
    }

    const formattedId = `Lesson${lesson.id.replace('lesson', '')}`;
    const lessonDir = path.join(DATA_DIR, formattedId);

    try {
      await fs.mkdir(lessonDir, { recursive: true });

      const details = { id: lesson.id, title: lesson.title, objective: lesson.level || 'N/A' };
      await fs.writeFile(path.join(lessonDir, 'details.json'), JSON.stringify(details, null, 2));
      await fs.writeFile(path.join(lessonDir, 'content.md'), placeholderContentMd(lesson.title));
      await fs.writeFile(path.join(lessonDir, 'tutorial.md'), placeholderTutorialMd(lesson.title));
      await fs.writeFile(path.join(lessonDir, 'quiz.json'), JSON.stringify(placeholderQuizJson(lesson.title), null, 2));
      await fs.writeFile(path.join(lessonDir, 'media.json'), JSON.stringify(placeholderMediaJson(), null, 2));

      console.log(`✅ Generated all files for: ${lessonDir}`);
      lesson_count++;
    } catch (error) {
      console.error(`❌ Error processing lesson ${lesson.id}:`, error);
    }
  }

  console.log(`🎉 Generation complete. ${lesson_count} lessons were processed.`);
}

generateLessons();