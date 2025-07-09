import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Alert
} from '@mui/material';

const QuizRenderer = ({ quiz }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, option) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  
  if (!quiz || !quiz.questions) {
    return <Typography color="text.secondary">Quiz data is not available or malformed.</Typography>;
  }

  const calculateScore = () => {
    return quiz.questions.reduce((score, question, index) => {
      return answers[index] === question.answer ? score + 1 : score;
    }, 0);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 } }} elevation={2}>
      <Typography variant="h5" component="h2" gutterBottom>
        {quiz.title}
      </Typography>
      <Box>
        {quiz.questions.map((q, index) => (
          <FormControl key={index} component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
              {index + 1}. {q.question}
            </FormLabel>
            <RadioGroup
              name={`question-${index}`}
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              {q.options.map((option, i) => {
                const isCorrect = q.answer === option;
                const isSelected = answers[index] === option;
                let labelColor = 'text.primary'; // Default color

                if (submitted) {
                  if (isCorrect) {
                    labelColor = 'success.main'; // Correct answer
                  } else if (isSelected && !isCorrect) {
                    labelColor = 'error.main'; // Incorrectly selected answer
                  }
                }

                return (
                  <FormControlLabel key={i} value={option} control={<Radio disabled={submitted} />} label={option} sx={{ color: labelColor }} />
                );
              })}
            </RadioGroup>
          </FormControl>
        ))}
        {!submitted && <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit Answers</Button>}
        {submitted && (
          <Alert severity="info" sx={{ mt: 3 }}>
            Quiz Complete! You scored {calculateScore()} out of {quiz.questions.length}.
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default QuizRenderer;