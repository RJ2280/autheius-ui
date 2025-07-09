import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import QuizRenderer from './QuizRenderer.jsx';
import YouTube from 'react-youtube';
import './LessonViewer.css';

const LessonViewer = ({ lessonId }) => {
  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson', 'tutorial', 'quiz'
  const [lessonContent, setLessonContent] = useState('');
  const [tutorialContent, setTutorialContent] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const idNumber = lessonId.replace('lesson', '');
        // The generate-lessons.js script creates folders like "Lesson01", "Lesson02", etc.
        // We will construct the path directly based on this known format.
        const basePath = `/data/Lesson${idNumber}/`;

        const fetchAndVerify = async (url, expectedContentType) => {
          const response = await fetch(url);
          if (!response.ok) {
            // If we get a 404, the file doesn't exist.
            return { ok: false, data: null, error: `File not found at ${url}` };
          }
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes(expectedContentType)) {
            return { ok: true, data: response, error: null };
          }
          // If the content type is wrong (e.g., text/html), it's the SPA fallback.
          return { ok: false, data: null, error: `Incorrect content type for ${url}. Expected ${expectedContentType}, but got ${contentType}. This usually means the file was not found.` };
        };

        // Fetch all lesson materials in parallel
        const [lessonResult, tutorialResult, quizResult, mediaResult] = await Promise.all([
          fetchAndVerify(`${basePath}content.md`, 'text/markdown'),
          fetchAndVerify(`${basePath}tutorial.md`, 'text/markdown'),
          fetchAndVerify(`${basePath}quiz.json`, 'application/json'),
          fetchAndVerify(`${basePath}media.json`, 'application/json'),
        ]);

        // Check for the primary content first. If it fails, we can't proceed.
        if (!lessonResult.ok) {
          throw new Error(lessonResult.error);
        }

        const lessonText = await lessonResult.data.text();
        const tutorialText = tutorialResult.ok ? await tutorialResult.data.text() : 'No tutorial available for this lesson.';
        const quizJson = quizResult.ok ? await quizResult.data.json() : null;
        const mediaJson = mediaResult.ok ? await mediaResult.data.json() : null;

        setLessonContent(lessonText);
        setTutorialContent(tutorialText);
        setQuizData(quizJson);
        setMediaData(mediaJson);
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
        return mediaData?.youtubeId ? (
          <div className="video-container">
            <YouTube videoId={mediaData.youtubeId} opts={{ width: '100%', playerVars: { autoplay: 0 } }} />
          </div>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{tutorialContent}</ReactMarkdown>
        );
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

export default LessonViewer;// Add this import at the top



