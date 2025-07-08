import React from 'react';

const NarrationPlayer = ({ lessonId }) => {
  const [audioUrl, setAudioUrl] = React.useState('');

  React.useEffect(() => {
    fetch(`/data/${lessonId}/narration.json`)
      .then(res => res.json())
      .then(data => setAudioUrl(data.narration || ''));
  }, [lessonId]);

  return audioUrl ? (
    <div>
      <h3>🗣️ Narration</h3>
      <audio src={audioUrl} controls />
    </div>
  ) : null;
};

export default NarrationPlayer;
