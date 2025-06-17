/**
 * Formats a time in seconds to a MM:SS string
 * @param {number} totalSeconds - Time in seconds
 * @returns {string} Formatted time string (MM:SS)
 */
export const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * 
 * @param {Array} array - The array to shuffle
 * @returns {Array} The shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Calculates the quiz score based on answers
 * @param {Array} questions - Array of question objects
 * @param {Object} userAnswers - Object mapping question IDs to selected answer IDs
 * @returns {number} The calculated score
 */
export const calculateScore = (questions, userAnswers) => {
  let score = 0;
  questions.forEach(question => {
    if (userAnswers[question.id] === question.correct) {
      score++;
    }
  });
  return score;
};

/**
 * Creates a timestamp string for the current date and time
 * @returns {string} Formatted date and time string
 */
export const getTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

/**
 * Sorts leaderboard entries by score (highest first) and then by time (fastest first)
 * @param {Array} entries - Array of leaderboard entries
 * @returns {Array} Sorted leaderboard entries
 */
export const sortLeaderboard = (entries) => {
  return [...entries].sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // Higher score first
    }
    return a.time - b.time; // Faster time first
  });
};

/**
 * Checks if all questions have been answered
 * @param {Array} questions - Array of question objects
 * @param {Object} userAnswers - Object mapping question IDs to selected answer IDs
 * @returns {boolean} True if all questions are answered, false otherwise
 */
export const allQuestionsAnswered = (questions, userAnswers) => {
  return questions.every(question => userAnswers[question.id] !== undefined);
};

/**
 * Returns the percentage of questions answered correctly
 * @param {number} score - The user's score
 * @param {number} total - The total number of questions
 * @returns {number} Percentage of correct answers
 */
export const calculatePercentage = (score, total) => {
  return Math.round((score / total) * 100);
};