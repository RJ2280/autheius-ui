import React, { useEffect, useState } from 'react';

const QuizRunner = ({ lessonId = 'lesson01' }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passingScore, setPassingScore] = useState(70);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetch(`/data/${lessonId}/quizzes.json`);
        const data = await res.json();
        setQuestions(data.questions || []);
        setPassingScore(data.scoring?.passing_score || 70);
      } catch (err) {
        console.error('Quiz loading error:', err);
      }
    };
    loadQuiz();
  }, [lessonId]);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if ((answers[i] || '').trim().toLowerCase() === q.answer.trim().toLowerCase()) {
        correct += 1;
      }
    });
    const totalScore = correct * (10); // 10 points per question
    setScore(totalScore);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🧪 Lesson Quiz</h2>
      {questions.length === 0 ? (
        <p>No quiz data found.</p>
      ) : submitted ? (
        <div>
          <p>✅ You scored: {score} / {questions.length * 10}</p>
          <p>{score >= passingScore ? '🎉 Passed!' : '🔁 Try again!'}</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <label><strong>{q.question}</strong></label>
              <input
                type="text"
                value={answers[i] || ''}
                onChange={(e) => handleChange(i, e.target.value)}
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
              />
            </div>
          ))}
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Submit</button>
        </form>
      )}
    </div>
  );
};

export default QuizRunner;
