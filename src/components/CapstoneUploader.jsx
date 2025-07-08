import React, { useState } from 'react';

const CapstoneUploader = ({ userId }) => {
  const [projectName, setProjectName] = useState('');

  const submit = () => {
    fetch('/api/capstone/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, projectName })
    }).then(() => alert('🚀 Capstone submitted!'));
  };

  return (
    <div className="capstone-uploader">
      <input
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        placeholder="Project Name"
      />
      <button onClick={submit}>🎓 Upload Capstone</button>
    </div>
  );
};

export default CapstoneUploader;
