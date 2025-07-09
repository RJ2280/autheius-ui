import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Chip, Link } from '@mui/material';
import apiClient from '../../api';
import { useGenerationStore } from '../../state/generationStore';

export const JobCard = ({ job }) => {
  const updateJob = useGenerationStore((state) => state.updateJob);
  const [internalJob, setInternalJob] = useState(job);
  const intervalRef = useRef();

  const pollStatus = useCallback(async () => {
    try {
      const { data } = await apiClient.get(`/generate/status/${internalJob.id}`);
      if (data.status === 'completed' || data.status === 'failed') {
        updateJob(internalJob.id, data);
        setInternalJob(data);
        clearInterval(intervalRef.current);
      } else {
        setInternalJob(data);
      }
    } catch (error) {
      console.error(`Failed to poll job ${internalJob.id}:`, error);
      clearInterval(intervalRef.current);
    }
  }, [internalJob.id, updateJob]); // Dependencies for pollStatus

  useEffect(() => {
    if (internalJob.status === 'processing') {
      intervalRef.current = setInterval(pollStatus, 5000); // Poll every 5 seconds
    }
    return () => clearInterval(intervalRef.current);
  }, [internalJob.status, pollStatus]); // Corrected dependencies for the effect

  const renderResult = () => {
    if (!internalJob.resultUrl) return null;
    if (internalJob.type === 'image') {
      return <img src={internalJob.resultUrl} alt={internalJob.prompt} style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '16px' }} />;
    }
    if (internalJob.type === 'video') {
      return <video src={internalJob.resultUrl} controls style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '16px' }} />;
    }
    return null;
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(internalJob.createdAt).toLocaleString()}
          </Typography>
          {internalJob.status === 'processing' && <CircularProgress size={20} />}
          {internalJob.status === 'completed' && <Chip label="Completed" color="success" size="small" />}
          {internalJob.status === 'failed' && <Chip label="Failed" color="error" size="small" />}
        </Box>
        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
          "{internalJob.prompt}"
        </Typography>
        <Chip label={internalJob.model} size="small" variant="outlined" />
        {renderResult()}
        {internalJob.resultUrl && (
          <Typography variant="caption" display="block" mt={1}>
            <Link href={internalJob.resultUrl} target="_blank" rel="noopener noreferrer">
              Open in new tab
            </Link>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
