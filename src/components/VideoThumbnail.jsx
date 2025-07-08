import React, { useState } from 'react';

const VideoThumbnail = ({ videoId }) => {
  const [thumb, setThumb] = useState('');

  const generate = () => {
    fetch('/api/agent/thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, prompt: 'Thumbnail of video: ' + videoId })
    })
      .then(res => res.json())
      .then(data => setThumb(data.thumbnail));
  };

  return (
    <div className="video-thumbnail">
      <button onClick={generate}>🖼️ Generate Thumbnail</button>
      {thumb && <img src={thumb} alt="Thumbnail" />}
    </div>
  );
};

export default VideoThumbnail;
