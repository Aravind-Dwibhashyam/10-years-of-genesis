import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SolutionsPage.css';

const SolutionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching solutions data...");
        setLoading(true);
        
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }
        
        const db = getDatabase();
        
        // 1. Fetch all questions regardless of user answers
        console.log("Fetching questions from database...");
        const questionsRef = ref(db, 'questions');
        const questionsSnapshot = await get(questionsRef);
        
        if (!questionsSnapshot.exists()) {
          console.error("No questions found in database");
          setError("No questions found. Please contact the administrator.");
          setLoading(false);
          return;
        }
        
        const questionsData = questionsSnapshot.val();
        console.log("Questions data retrieved:", questionsData);
        
        // 2. Get user's answers if available
        try {
          const userResultsRef = ref(db, `quizResults/${currentUser.uid}`);
          const userResultsSnapshot = await get(userResultsRef);
          
          if (userResultsSnapshot.exists() && userResultsSnapshot.val().answers) {
            console.log("User answers found:", userResultsSnapshot.val().answers);
            setUserAnswers(userResultsSnapshot.val().answers);
          } else {
            console.log("No user answers found");
          }
        } catch (err) {
          console.error("Error fetching user answers:", err);
          // Continue even if user answers can't be fetched
        }
        
        // Convert questions object to array with IDs
        const questionsArray = Object.keys(questionsData).map(key => ({
          id: key,
          ...questionsData[key]
        }));
        
        console.log("Processed questions array:", questionsArray);
        setQuestions(questionsArray);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError("Error loading solutions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading solutions...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }
  
  if (!getAuth().currentUser) {
    return (
      <div className="solutions-container">
        <h1>Please Log In</h1>
        <p>You need to be logged in to view solutions.</p>
        <button onClick={() => navigate('/trivia/login')}>Go to Login</button>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="solutions-container">
        <h1>No Solutions Available</h1>
        <p>There are no questions or solutions available at this time.</p>
        <button onClick={() => navigate('/trivia/quiz')}>Back to Quiz</button>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="solutions-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants}>Quiz Solutions</motion.h1>
      <motion.p className="solutions-intro" variants={itemVariants}>
        Review the correct answers and explanations for all questions in the Ethereum 10th Anniversary Quiz.
      </motion.p>
      
      {questions.map((question, index) => (
        <motion.div 
          key={question.id} 
          className="solution-card"
          variants={itemVariants}
        >
          <h3>{index + 1}. {question.question || question.text}</h3>
          
          {question.type === 'mcq' ? (
            // MCQ solutions
            <div className="options-list">
              {Object.entries(question.options || {}).map(([optionId, optionText]) => {
                const isSelected = userAnswers[question.id] === optionId;
                const isCorrect = question.correct === optionId;
                
                return (
                  <div 
                    key={optionId} 
                    className={`solution-option ${isCorrect ? 'correct' : ''} ${isSelected && !isCorrect ? 'incorrect' : ''}`}
                  >
                    <span className="option-letter">{optionId}</span>
                    <span className="option-text">{optionText}</span>
                    {isCorrect && (
                      <span className="correct-label">✓ Correct</span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="incorrect-label">✗ Your Answer</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // FITB solutions
            <div className="fib-solution">
              <div className="user-answer">
                <h4>Your Answer:</h4>
                <p className={userAnswers[question.id]?.toLowerCase() === question.correct?.toLowerCase() ? 'correct-fib' : 'incorrect-fib'}>
                  {userAnswers[question.id] || "(No answer provided)"}
                </p>
              </div>
              <div className="correct-answer">
                <h4>Correct Answer:</h4>
                <p>{question.correct}</p>
              </div>
            </div>
          )}
          
          {question.solution && (
            <div className="explanation">
              <h4>Explanation:</h4>
              <p>{question.solution}</p>
            </div>
          )}
        </motion.div>
      ))}
      
      <motion.div className="solutions-footer" variants={itemVariants}>
        <button onClick={() => navigate('/trivia/quiz')}>Back to Quiz</button>
      </motion.div>
    </motion.div>
  );
};

export default SolutionsPage;