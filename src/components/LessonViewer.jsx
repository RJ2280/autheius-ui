import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import QuizRunner from './QuizRunner.jsx';
// Optional advanced modules (commented for now)
// import ProgressSync from './ProgressSync';
// import MistakeHeatmap from './MistakeHeatmap';
// import NarrationPlayer from './NarrationPlayer';
// import MediaPlayer from './MediaPlayer';

const LessonViewer = ({ lessonId = 'lesson01' }) => {
  const [content, setContent] = useState('');
  const [tutorial, setTutorial] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const basePath = `/data/${lessonId}`;

    fetch(`${basePath}/content.md`)
      .then(res => res.text())
      .then(setContent);

    fetch(`${basePath}/tutorial.md`)
      .then(res => res.text())
      .then(setTutorial);

    fetch(`${basePath}/quiz.json`)
      .then(res => res.json())
      .then(data => setQuizzes(data.questions || []));
  }, [lessonId]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>{`📘 ${lessonId.replace(/lesson/, 'Lesson ')}`}</h1>

      {/* <ProgressSync lessonId={lessonId} /> */}

      <h2>🧠 Lesson Content</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>

      <h2>🎓 Tutorial</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{tutorial}</Markdown>

      {/* <NarrationPlayer lessonId={lessonId} /> */}
      {/* <MediaPlayer lessonId={lessonId} /> */}

      <h2>🧪 Quiz</h2>
      {quizzes.length === 0 ? <p>⚠️ No quiz available.</p> : <QuizRunner lessonId={lessonId} quizzes={quizzes} />}
      <QuizRunner lessonId={lessonId} quizzes={quizzes} />

      {/* <MistakeHeatmap lessonId={lessonId} /> */}
    </div>
  );
};

export default LessonViewer;
