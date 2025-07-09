import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import QuizRenderer from './QuizRenderer.jsx';
import './LessonViewer.css';

const LessonViewer = ({ lessonId }) => {
  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson', 'tutorial', 'quiz'
  const [lessonContent, setLessonContent] = useState('');
  const [tutorialContent, setTutorialContent] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Robustly find the correct lesson directory path
        const idNumber = lessonId.replace('lesson', '');
        const possibleBasePaths = [
          `/data/Lesson${idNumber}/`, // Correct format: "Lesson01"
          `/data/${lessonId}/`,       // Alternative: "lesson01"
        ];

        let basePath = '';
        for (const p of possibleBasePaths) {
          const res = await fetch(`${p}content.md`, { method: 'HEAD' });
          if (res.ok) {
            basePath = p;
            break;
          }
        }

        if (!basePath) {
          throw new Error(`Could not find content for lesson '${lessonId}'. Please ensure lesson data folders exist in 'public/data/'.`);
        }

        // Fetch all lesson materials in parallel
        const [lessonRes, tutorialRes, quizRes] = await Promise.all([
          fetch(`${basePath}content.md`),
          fetch(`${basePath}tutorial.md`),
          fetch(`${basePath}quiz.json`),
        ]);

        const lessonText = await lessonRes.text();
        const tutorialText = tutorialRes.ok ? await tutorialRes.text() : 'No tutorial available for this lesson.';
        const quizJson = quizRes.ok ? await quizRes.json() : null;

        setLessonContent(lessonText);
        setTutorialContent(tutorialText);
        setQuizData(quizJson);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLessonData();
  }, [lessonId]);

  const renderContent = () => {
    switch (activeTab) {
      case 'lesson':
        return <ReactMarkdown remarkPlugins={[remarkGfm]}>{lessonContent}</ReactMarkdown>;
      case 'tutorial':
        return <ReactMarkdown remarkPlugins={[remarkGfm]}>{tutorialContent}</ReactMarkdown>;
      case 'quiz':
        return quizData ? <QuizRenderer quiz={quizData} /> : <p>No quiz available for this lesson.</p>;
      default:
        return null;
    }
  };

  if (loading) return <div className="loading-state">Loading lesson materials...</div>;
  if (error) return <div className="error-state">❌ {error}</div>;

  return (
    <div className="lesson-viewer-container">
      <div className="lesson-tabs">
        <button onClick={() => setActiveTab('lesson')} className={activeTab === 'lesson' ? 'active' : ''}>Lesson</button>
        <button onClick={() => setActiveTab('tutorial')} className={activeTab === 'tutorial' ? 'active' : ''}>Tutorial</button>
        <button onClick={() => setActiveTab('quiz')} className={activeTab === 'quiz' ? 'active' : ''}>Quiz</button>
      </div>
      <div className="lesson-tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default LessonViewer;