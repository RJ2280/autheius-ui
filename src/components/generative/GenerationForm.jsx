import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, Typography, Paper, Alert } from '@mui/material';
import { useGenerationStore } from '../../state/generationStore';

const imageModels = {
  'imagen-4.0-fast-generate-preview-06-06': 'Imagen 4 Fast (Recommended)',
  'imagen-4.0-generate-preview-06-06': 'Imagen 4',
  'imagen-4.0-ultra-generate-preview-06-06': 'Imagen 4 Ultra',
};

const videoModels = {
  'veo-3.0-generate-preview': 'Veo 3 (Preview)',
  'veo-2.0-generate-001': 'Veo 2',
};

export const GenerationForm = () => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState(Object.keys(imageModels)[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { startGeneration, latestCritique } = useGenerationStore((state) => ({
    startGeneration: state.startGeneration,
    latestCritique: state.latestCritique,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt || !model) return;
    setIsLoading(true);
    await startGeneration(prompt, model);
    // Do not clear the prompt, so the user can refine it.
    setIsLoading(false);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }} elevation={2}>
      <Typography variant="h6" component="h2">Create New Asset</Typography>
      {latestCritique && (
        <Alert severity={latestCritique.includes("strong prompt") ? "success" : "info"} sx={{ mt: 1, mb: 1 }}>
          {latestCritique}
        </Alert>
      )}
      <TextField
        label="Prompt"
        multiline
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., A cinematic shot of a cat astronaut exploring Mars"
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel id="model-select-label">Model</InputLabel>
        <Select
          labelId="model-select-label"
          value={model}
          label="Model"
          onChange={(e) => setModel(e.target.value)}
        >
          <MenuItem disabled><em>--- Image Models ---</em></MenuItem>
          {Object.entries(imageModels).map(([id, name]) => (
            <MenuItem key={id} value={id}>{name}</MenuItem>
          ))}
          <MenuItem disabled><em>--- Video Models ---</em></MenuItem>
          {Object.entries(videoModels).map(([id, name]) => (
            <MenuItem key={id} value={id}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" disabled={isLoading || !prompt}>
        {isLoading ? <CircularProgress size={24} /> : 'Generate'}
      </Button>
    </Paper>
  );
};
