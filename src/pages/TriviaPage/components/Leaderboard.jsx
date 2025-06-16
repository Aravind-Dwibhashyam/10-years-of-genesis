import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Leaderboard = ({ leaderboardData, userScore, formatTime, questionCount, onViewSolutions, onRetryQuiz }) => {
  const navigate = useNavigate();
  
  console.log("Leaderboard props:", { leaderboardData, userScore, questionCount });
  
  return (
    <motion.div 
      className="leaderboard-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Quiz Results
      </motion.h1>
      
      {userScore ? (
        <motion.div 
          className="user-score-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <h2>Your Score</h2>
          <div className="user-score-details">
            <p>Score: <span>{userScore.score}</span> out of {questionCount}</p>
            <p>Time: <span>{formatTime(userScore.time)}</span></p>
          </div>
        </motion.div>
      ) : (
        <p>Score data unavailable</p>
      )}
      
      <motion.div 
        className="leaderboard-container"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Leaderboard</h2>
        {leaderboardData && leaderboardData.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <motion.tr 
                  key={index} 
                  className={entry.userId === userScore?.userId ? 'current-user' : ''}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.score}</td>
                  <td>{formatTime(entry.time)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leaderboard data available yet. Be the first on the leaderboard!</p>
        )}
      </motion.div>
      
      <motion.div 
        className="action-buttons"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button 
          onClick={() => navigate('/trivia/solutions')}
          className="view-solutions-button"
          whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(127, 127, 213, 0.3)'
                }}
          whileTap={{ scale: 0.95 }}
        >
          View Solutions
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 8px 25px rgba(127, 127, 213, 0.3)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Take Quiz Again
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;