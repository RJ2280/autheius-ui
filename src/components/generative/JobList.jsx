import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useGenerationStore } from '../../state/generationStore';
import { JobCard } from './JobCard';

export const JobList = () => {
  const { jobs, fetchJobs } = useGenerationStore((state) => ({
    jobs: state.jobs,
    fetchJobs: state.fetchJobs,
  }));

  // Fetch the initial list of jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      {jobs.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ p: 4 }}>No generation jobs yet. Create one to get started!</Typography>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </Box>
  );
};
