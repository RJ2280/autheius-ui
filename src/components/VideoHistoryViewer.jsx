import React, { useEffect, useState } from 'react';

const VideoHistoryViewer = ({ userId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`/api/video/history?user=${userId}`)
      .then(res => res.json())
      .then(data => setVideos(data.videos || []));
  }, [userId]);

  return (
    <div className="video-history">
      <h2>🧾 Your Video History</h2>
      <ul>
        {videos.map(v => (
          <li key={v.id}>
            <p>{v.title}</p>
            <iframe title={v.title} src={v.url} width="100%" height="240" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoHistoryViewer;
