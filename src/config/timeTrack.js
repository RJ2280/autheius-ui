export const startTimer = (lessonId) => {
  const start = Date.now();
  localStorage.setItem(`${lessonId}-startTime`, start.toString());
};

export const stopTimer = (lessonId) => {
  const start = localStorage.getItem(`${lessonId}-startTime`);
  const duration = start ? Date.now() - Number(start) : 0;
  const total = Number(localStorage.getItem(`${lessonId}-totalTime`) || 0);
  localStorage.setItem(`${lessonId}-totalTime`, (total + duration).toString());
  return duration;
};

export const getTotalTime = (lessonId) => {
  return Number(localStorage.getItem(`${lessonId}-totalTime`) || 0);
};
