import React, { useState } from 'react';

const VideoSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    fetch(`/api/agent/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data.results || []));
  };

  return (
    <div className="video-search">
      <h2>🔎 Search Your Knowledge</h2>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Try 'Generative AI'" />
      <button onClick={search}>Search</button>
      <ul>
        {results.map(v => (
          <li key={v.id}>
            <p>{v.title}</p>
            <iframe src={v.url} width="100%" height="240" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoSearch;
