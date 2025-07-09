import React, { useState } from 'react';
import TaskBar from '../layout/TaskBar.jsx';
import axios from 'axios'; // Import axios
import './VideoBuilder.css';

const VideoBuilderScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  const [error, setError] = useState('');
  const [generationNote, setGenerationNote] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a prompt to generate a video.');
      return;
    }
    setIsGenerating(true);
    setError('');
    setGeneratedVideoUrl('');
    setGenerationNote('');

    try {
      // The Vite proxy will forward this to http://localhost:3000/api/video/generate
      const response = await axios.post('/api/video/generate', {
        prompt,
        aspectRatio,
      });
      setGeneratedVideoUrl(response.data.videoUrl);
      if (response.data.generatedImage) {
        setGenerationNote('Note: AI image generation successful! Video is a placeholder.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An unknown error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="video-builder-container">
      <TaskBar section="Video Builder" />
      <div className="video-builder-content">
        <div className="builder-panel">
          <h1>AI Video Builder</h1>
          <p>Create stunning videos from text prompts using generative AI. Describe your scene, and let Autheius bring it to life.</p>
          <form onSubmit={handleGenerate}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A cinematic shot of a futuristic city at night, with flying cars and neon signs..."
              rows="5"
              disabled={isGenerating}
            />
            <div className="settings-row">
              <label htmlFor="aspect-ratio">Aspect Ratio:</label>
              <select id="aspect-ratio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} disabled={isGenerating}>
                <option value="16:9">16:9 (Widescreen)</option>
                <option value="9:16">9:16 (Vertical)</option>
                <option value="1:1">1:1 (Square)</option>
              </select>
            </div>
            <button type="submit" disabled={isGenerating}>
              {isGenerating ? '✨ Generating...' : 'Generate Video'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {generationNote && <p className="note-message">{generationNote}</p>}
          </form>
        </div>
        <div className="viewer-panel">
          <h2>Preview</h2>
          <div className="video-preview-box">
            {isGenerating && <div className="loading-spinner"></div>}
            {!isGenerating && generatedVideoUrl && <video src={generatedVideoUrl} controls autoPlay muted loop />}
            {!isGenerating && !generatedVideoUrl && <p>Your generated video will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBuilderScreen;
