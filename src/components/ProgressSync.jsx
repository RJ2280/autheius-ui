import React, { useEffect } from 'react';
import { syncEndpoints } from '../config/syncConfig.js';

const ProgressSync = ({ lessonId }) => {
  useEffect(() => {
    const status = localStorage.getItem(`${lessonId}-completed`);
    fetch(syncEndpoints.pushProgress, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, completed: status === 'true' })
    });
  }, [lessonId]);

  return null;
};

export default ProgressSync;
