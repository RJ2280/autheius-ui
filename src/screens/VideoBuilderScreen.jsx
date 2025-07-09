import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Paper,
  Alert,
} from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const VideoBuilderScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsGenerating(true);
    setError('');
    setGeneratedVideoUrl('');

    try {
      const response = await axios.post(`${API_URL}/api/video/generate`, {
        prompt,
        aspectRatio,
      });
      setGeneratedVideoUrl(response.data.videoUrl);
    } catch (err) {
      const message = err.response?.data?.error || 'An unknown error occurred while generating the video.';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, height: '100%' }}>
      {/* Builder Panel */}
      <Paper component="form" onSubmit={handleGenerate} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h1">AI Video Builder</Typography>
        <Typography color="text.secondary">
          Create stunning videos from text prompts using generative AI. Describe your scene, and let Autheius bring it to life.
        </Typography>
        <TextField
          label="Prompt"
          multiline
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cinematic shot of a futuristic city at night, with flying cars and neon signs..."
          disabled={isGenerating}
          fullWidth
          required
        />
        <FormControl fullWidth disabled={isGenerating}>
          <InputLabel id="aspect-ratio-label">Aspect Ratio</InputLabel>
          <Select
            labelId="aspect-ratio-label"
            id="aspect-ratio"
            value={aspectRatio}
            label="Aspect Ratio"
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <MenuItem value="16:9">16:9 (Widescreen)</MenuItem>
            <MenuItem value="9:16">9:16 (Vertical)</MenuItem>
            <MenuItem value="1:1">1:1 (Square)</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" disabled={isGenerating} sx={{ height: '56px' }}>
          {isGenerating ? <CircularProgress size={24} /> : 'Generate Video'}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>

      {/* Viewer Panel */}
      <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>Preview</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 2, minHeight: 300 }}>
          {isGenerating && <CircularProgress />}
          {!isGenerating && generatedVideoUrl && (
            <Box component="video" src={generatedVideoUrl} controls autoPlay muted loop sx={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 1 }} />
          )}
          {!isGenerating && !generatedVideoUrl && (
            <Typography color="text.secondary">Your generated video will appear here.</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default VideoBuilderScreen;
