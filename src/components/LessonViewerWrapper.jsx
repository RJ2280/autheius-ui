import { useParams } from 'react-router-dom';
import LessonViewer from './LessonViewer.jsx';

const LessonViewerWrapper = () => {
  const { id } = useParams();
  return <LessonViewer lessonId={id || 'lesson01'} />;
};

export default LessonViewerWrapper;
