import React from 'react';

const MediaPlayer = ({ lessonId }) => {
  const path = `/data/${lessonId}/media.json`;
  const [videoUrl, setVideoUrl] = React.useState('');

  React.useEffect(() => {
    fetch(path)
      .then(res => res.json())
      .then(data => setVideoUrl(data.video || ''));
  }, [lessonId]);

  return videoUrl ? (
    <div>
      <h3>🎬 Lesson Video</h3>
      <video src={videoUrl} controls width="100%" />
    </div>
  ) : null;
};

export default MediaPlayer;
