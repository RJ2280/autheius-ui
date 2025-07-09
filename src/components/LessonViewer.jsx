import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import QuizRenderer from './QuizRenderer.jsx';
import YouTube from 'react-youtube';
import { Box, Tabs, Tab, CircularProgress, Alert, Paper, Typography } from '@mui/material';

/**
 * A helper component to render the content of a tab panel.
 * It ensures content is only rendered when its corresponding tab is active.
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      aria-labelledby={`lesson-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, '& h1, & h2, & h3': { mt: 2, mb: 1 }, '& p': { lineHeight: 1.7 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LessonViewer = ({ lessonId }) => {
  const [activeTab, setActiveTab] = useState(0); // Use index for MUI tabs
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
        // Defensively handle the lessonId prop. It should be a string, but if it's
        // an object like { id: 'lesson01' }, this will extract the string.
        const idString = (typeof lessonId === 'object' && lessonId !== null) ? String(lessonId.id || lessonId) : String(lessonId);

        if (!idString || idString === 'undefined' || idString.includes('object')) {
          // Provide a more informative error if the ID is still invalid.
          throw new Error(`Invalid lessonId provided. Expected a string, but got: ${JSON.stringify(lessonId)}`);
        }

        const idNumber = idString.replace('lesson', '');
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2, color: 'text.secondary' }}>Loading lesson materials...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  return (
    <Paper sx={{ width: '100%', backgroundColor: 'background.paper' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="lesson content tabs" textColor="primary" indicatorColor="primary">
          <Tab label="Lesson" id="lesson-tab-0" aria-controls="lesson-tabpanel-0" />
          <Tab label="Tutorial" id="lesson-tab-1" aria-controls="lesson-tabpanel-1" />
          <Tab label="Quiz" id="lesson-tab-2" aria-controls="lesson-tabpanel-2" />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lessonContent}</ReactMarkdown>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {mediaData?.youtubeId ? (
          <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <YouTube videoId={mediaData.youtubeId} opts={{ width: '100%', height: '100%' }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
          </Box>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{tutorialContent}</ReactMarkdown>
        )}
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        {quizData ? <QuizRenderer quiz={quizData} /> : <Typography>No quiz available for this lesson.</Typography>}
      </TabPanel>
    </Paper>
  );
};

export default LessonViewer;
