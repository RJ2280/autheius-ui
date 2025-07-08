import React from 'react';

const HistoryDashboard = ({ lessonId }) => {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    fetch(`/data/${lessonId}/quiz.json`)
      .then(res => res.json())
      .then(data => setHistory(data.history || []));
  }, [lessonId]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>📈 Quiz History</h3>
      {history.length === 0 ? <p>No attempts yet.</p> :
        <ul>{history.map((h, i) => <li key={i}>Score: {h.score}, Date: {h.date}</li>)}</ul>}
    </div>
  );
};

export default HistoryDashboard;
