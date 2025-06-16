import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import QuizPage from './QuizPage';
import SolutionsPage from './SolutionsPage';
import './TriviaPage.css';
import './AuthStyles.css';
import ethereumIcon from '../../assets/Eth-logo2.svg';

const TriviaPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const generateRandomPosition = () => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5
    };
  };
  
  // Generate ethereum symbols data
  const ethSymbols = Array.from({ length: 20 }, () => generateRandomPosition());
  
  if (loading) {
    return (
      <div className="trivia-loading-container">
        <div className="trivia-loading-spinner"></div>
        <p>Loading Ethereum Trivia...</p>
      </div>
    );
  }
  
  // Check if we're on a nested route
  const isNestedRoute = 
    location.pathname.includes('/trivia/quiz') || 
    location.pathname.includes('/trivia/solutions') || 
    location.pathname.includes('/trivia/login') || 
    location.pathname.includes('/trivia/signup');
  
  // If we're on the main /trivia route, show trivia hub
  if (!isNestedRoute) {
    return (
      
      <div className="trivia-hub-container">
        <div className="ethereum-bg">
          <div className="floating-symbols">
            {ethSymbols.map((symbol, index) => (
              <motion.div
                key={index}
                className="eth-symbol"
                style={{ 
                  left: `${symbol.x}%`,
                  top: `${symbol.y}%`,
                  fontSize: `${symbol.size}px`
                }}
                initial={{ opacity: 0.1, y: 0 }}
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  y: [0, -100],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: symbol.duration,
                  delay: symbol.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Ξ
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="trivia-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="trivia-card-logo"
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            <img src={ethereumIcon} alt="Ethereum Logo" />
          </motion.div>
          
          <h1>Ethereum 10th Anniversary Trivia Challenge</h1>
          <p>Test your knowledge about Ethereum's history, technology, and ecosystem in this interactive quiz!</p>
          
          {user ? (
            <div className="trivia-actions">
              <motion.button 
                className="trivia-button primary"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(127, 127, 213, 0.4)'
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/trivia/quiz')}
              >
                <span className="button-icon">▶</span>
                Start Quiz
              </motion.button>
              <motion.button 
                className="trivia-button secondary"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(127, 127, 213, 0.3)'
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/trivia/solutions')}
              >
                <span className="button-icon"></span>
                View Solutions
              </motion.button>
              <motion.button 
                className="trivia-button logout"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 8px 15px rgba(244, 67, 54, 0.3)'
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => getAuth().signOut()}
              >
                <span className="button-icon"></span>
                Log Out
              </motion.button>
            </div>
          ) : (
            <div className="trivia-actions">
              <motion.button 
                className="trivia-button primary"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(127, 127, 213, 0.4)'
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/trivia/login')}
              >
                <span className="button-icon"></span>
                Login to Start
              </motion.button>
              <motion.button 
                className="trivia-button secondary"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(127, 127, 213, 0.3)'
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/trivia/signup')}
              >
                <span className="button-icon"></span>
                Create Account
              </motion.button>
            </div>
          )}
          
          
        </motion.div>
      </div>
      
    );
  }
  
  // Otherwise, render the child routes
  return (
    <div className="trivia-content">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="quiz" element={user ? <QuizPage /> : <LoginPage />} />
        <Route path="solutions" element={user ? <SolutionsPage /> : <LoginPage />} />
      </Routes>
    </div>
  );
};

export default TriviaPage;