import React, { useEffect, useState } from 'react';

const ReflexSuggestion = ({ userId }) => {
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    fetch(`/api/agent/reflex?user=${userId}`)
      .then(res => res.json())
      .then(data => setSuggestion(data.reflex));
  }, [userId]);

  return (
    <div className="reflex-suggestion">
      <h2>🧠 Autheius Suggests:</h2>
      <p>{suggestion}</p>
    </div>
  );
};

export default ReflexSuggestion;
