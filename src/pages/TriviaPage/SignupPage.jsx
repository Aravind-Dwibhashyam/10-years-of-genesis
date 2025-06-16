import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { motion } from 'framer-motion';
import AuthForm from './components/AuthForm';
import './AuthStyles.css';

const SignupPage = () => {
  const navigate = useNavigate();
  
  const handleSignup = async ({ email, password, username }) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save username to database
      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        username,
        email
      });
      
      navigate('/trivia/quiz');
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const generateRandomPosition = () => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5
    };
  };
  
  // Reduced animation objects to prevent performance issues
  const ethSymbols = Array.from({ length: 12 }, () => generateRandomPosition());
  
  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background with pointer-events: none */}
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
      
      {/* Form with higher z-index */}
      <motion.div 
        className="form-wrapper" 
        style={{ position: 'relative', zIndex: 20 }}
      >
        <AuthForm 
          title="Join Ethereum Trivia"
          subtitle="Create an account to test your knowledge and compete with others"
          buttonText="Create Account"
          showUsername={true}
          onSubmit={handleSignup}
          redirectText="Already have an account?"
          redirectLink="/trivia/login"
          redirectLinkText="Sign In"
        />
      </motion.div>
    </motion.div>
  );
};

export default SignupPage;