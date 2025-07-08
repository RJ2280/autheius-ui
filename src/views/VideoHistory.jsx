import React from 'react';
import VideoHistoryViewer from '../components/VideoHistoryViewer.jsx';

const VideoHistory = ({ userId }) => {
  return (
    <div className="video-history-page">
      <h1>🎞️ Autheius Video Archive</h1>
      <VideoHistoryViewer userId={userId} />
    </div>
  );
};

export default VideoHistory;
