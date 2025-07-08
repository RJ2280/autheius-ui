import React, { useEffect, useState } from 'react';

const VideoSuggestions = ({ userId }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`/api/agent/suggestions?user=${userId}`)
      .then(res => res.json())
      .then(data => setSuggestions(data.suggestions || []));
  }, [userId]);

  return (
    <div className="video-suggestions">
      <h2>🎥 Suggested Videos Based on Your Lessons</h2>
      {suggestions.map(v => (
        <iframe key={v.id} src={v.url} title={v.title} width="100%" height="240" />
      ))}
    </div>
  );
};

export default VideoSuggestions;
