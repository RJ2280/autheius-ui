import { useState } from 'react';
import axios from 'axios';

export default function TutorAgentPanel({ lessonId }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const askAgent = async () => {
    const res = await axios.post('/api/autheius-tutor', {
      lessonId,
      userQuestion: query
    });
    setResponse(res.data.reply || 'No response');
  };

  return (
    <div>
      <h3>💬 Ask Autheius AI</h3>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type your question..."
        style={{ width: '80%' }}
      />
      <button onClick={askAgent}>Ask</button>
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{response}</div>
    </div>
  );
}
