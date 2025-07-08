import React, { useState } from 'react';

const VeoBuilderForm = () => {
  const [mode, setMode] = useState('veo2');
  const [input, setInput] = useState({});
  const [videoURL, setVideoURL] = useState('');

  const buildVideo = () => {
    fetch(`/api/video/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
      .then(res => res.json())
      .then(data => setVideoURL(data.video || ''));
  };

  return (
    <div className="veo-builder">
      <h2>🎬 Veo Video Builder</h2>

      <select value={mode} onChange={e => setMode(e.target.value)}>
        <option value="veo2">Veo 2 (Short Concept)</option>
        <option value="veo3">Veo 3 (Narrative Project)</option>
      </select>

      {mode === 'veo2' ? (
        <>
          <input placeholder="Topic" onChange={e => setInput({ ...input, topic: e.target.value })} />
          <input placeholder="Visual Style" onChange={e => setInput({ ...input, visuals: e.target.value })} />
          <input placeholder="Voice" onChange={e => setInput({ ...input, voice: e.target.value })} />
        </>
      ) : (
        <>
          <input placeholder="Title" onChange={e => setInput({ ...input, title: e.target.value })} />
          <input placeholder="Format Style" onChange={e => setInput({ ...input, style: e.target.value })} />
          <input placeholder="Music Mood" onChange={e => setInput({ ...input, music: e.target.value })} />
          <input placeholder="Narration Tone" onChange={e => setInput({ ...input, narration: e.target.value })} />
        </>
      )}

      <button onClick={buildVideo}>🚀 Generate Video</button>

      {videoURL && <iframe title="Veo video" src={videoURL} width="100%" height="360" allow="autoplay" />}
    </div>
  );
};

export default VeoBuilderForm;
