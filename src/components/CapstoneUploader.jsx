import React, { useState } from 'react';
import axios from 'axios';

const CapstoneUploader = ({ userId }) => {
  const [projectName, setProjectName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !projectName) {
      setMessage('Please provide a project name and select a file.');
      return;
    }

    setFeedback(''); // Clear previous feedback on new submission
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('projectName', projectName);
    formData.append('capstoneFile', file); // This key must match the backend: `upload.single('capstoneFile')`

    try {
      const response = await axios.post('/api/capstone/upload', formData);
      setMessage(`✅ ${response.data.message}`);
      setFeedback(response.data.feedback);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'An error occurred during upload.';
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="capstone-uploader" onSubmit={handleSubmit}>
      <h2>Capstone Submission</h2>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project Name"
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : '🎓 Upload Capstone'}
      </button>
      {message && <p className="submission-status">{message}</p>}
      {feedback && (
        <div className="feedback-panel">
          <h3>Evaluation Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </form>
  );
};

export default CapstoneUploader;
