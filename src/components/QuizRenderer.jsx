import React, { useState } from 'react';
import './QuizRenderer.css';

const QuizRenderer = ({ quiz }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getResultClass = (question, questionIndex, option) => {
    if (!submitted) return '';
    const isCorrectAnswer = option === question.answer;
    const isSelectedAnswer = answers[questionIndex] === option;

    if (isCorrectAnswer) {
      return 'correct';
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return 'incorrect';
    }
    return '';
  };

  if (!quiz || !quiz.questions) {
    return <p>Quiz data is not available or malformed.</p>;
  }

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, index) => (
          <div key={index} className="quiz-question">
            <p><strong>{index + 1}. {q.question}</strong></p>
            <div className="quiz-options">
              {q.options.map((option, i) => (
                <label key={i} className={`quiz-option ${getResultClass(q, index, option)}`}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                    disabled={submitted}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        {!submitted && <button type="submit" className="quiz-submit-btn">Submit Answers</button>}
      </form>
    </div>
  );
};

export default QuizRenderer;