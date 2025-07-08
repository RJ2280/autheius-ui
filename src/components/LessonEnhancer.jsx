import React, { useState } from 'react';

const LessonEnhancer = ({ lessonId }) => {
  const [output, setOutput] = useState('');

  const enhance = () => {
    fetch(`/api/lesson/${lessonId}/enhance`)
      .then(res => res.json())
      .then(data => setOutput(data.generated));
  };

  return (
    <div className="enhancer">
      <button onClick={enhance}>✨ Enhance Lesson with Gemini</button>
      {output && <p>{output}</p>}
    </div>
  );
};

export default LessonEnhancer;
