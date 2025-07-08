import React from 'react';

const VeoPlayback = ({ src }) => {
  return src ? (
    <iframe
      src={src}
      title="Autheius Video"
      width="100%"
      height="360"
      allow="autoplay; encrypted-media"
      frameBorder="0"
    />
  ) : (
    <p>🎥 No video available.</p>
  );
};

export default VeoPlayback;
