import React, { useState } from 'react';

const GeoTagger = ({ userId }) => {
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');

  const tag = () => {
    fetch('/api/agent/geotag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, city, region, country: 'US' })
    }).then(() => alert('📍 Location tagged'));
  };

  return (
    <div className="geo-tagger">
      <h2>📍 Where Did You Learn?</h2>
      <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
      <input placeholder="State/Region" value={region} onChange={e => setRegion(e.target.value)} />
      <button onClick={tag}>Tag My Location</button>
    </div>
  );
};

export default GeoTagger;
