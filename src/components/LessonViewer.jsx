import React, { useEffect, useState } from 'react';
import QuizRunner from './QuizRunner.jsx';
import DiagnosticOverlay from './DiagnosticOverlay.jsx';

const LessonViewer = ({ lessonId = 'lesson01' }) => {
  const [content, setContent] = useState('');
  const [tutorial, setTutorial] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const basePath = `/data/${lessonId}`;

    fetch(`${basePath}/content.md`)
      .then(res => res.ok ? res.text() : Promise.reject("No content.md"))
      .then(setContent)
      .catch(err => {
        console.error("❌ content.md error:", err);
        setError("Missing content.md");
        setContent("⚠️ No lesson content");
      });

    fetch(`${basePath}/tutorial.md`)
      .then(res => res.ok ? res.text() : Promise.reject("No tutorial.md"))
      .then(setTutorial)
      .catch(err => {
        console.error("❌ tutorial.md error:", err);
        setError("Missing tutorial.md");
        setTutorial("⚠️ No tutorial");
      });

    fetch(`${basePath}/quiz.json`)
      .then(res => res.ok ? res.json() : Promise.reject("No quiz.json"))
      .then(data => {
        const q = Array.isArray(data.questions) ? data.questions : [];
        setQuizzes(q);
      })
      .catch(err => {
        console.error("❌ quiz.json error:", err);
        setError("Invalid quiz.json");
        setQuizzes([]);
      });
  }, [lessonId]);

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#fff',
      color: '#000',
      fontFamily: 'sans-serif'
    }}>
      <h1>{`📘 ${lessonId.replace(/lesson/, 'Lesson ')}`}</h1>
      <h2>🧠 Content</h2>
      <p>{content}</p>
      <h2>🎓 Tutorial</h2>
      <p>{tutorial}</p>
      <h2>🧪 Quiz</h2>
      {quizzes.length === 0 ? (
        <p>⚠️ No quiz available</p>
      ) : (
        <QuizRunner lessonId={lessonId} quizzes={quizzes} />
      )}
      <DiagnosticOverlay
        lessonId={lessonId}
        content={content}
        tutorial={tutorial}
        quizzes={quizzes}
        error={error}
      />
    </div>
  );
};

export default LessonViewer;
