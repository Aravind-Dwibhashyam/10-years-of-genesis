import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';
import AuthForm from './components/AuthForm';
import './AuthStyles.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleLogin = async ({ email, password }) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
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
  
  // Generate ethereum symbols data - reduced count to prevent performance issues
  const ethSymbols = Array.from({ length: 12 }, () => generateRandomPosition());
  
  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background layer - with pointer-events: none */}
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
      
      {/* Form container - higher z-index */}
      <motion.div 
        className="form-wrapper" 
        style={{ position: 'relative', zIndex: 20 }}
      >
        <AuthForm 
          title="Welcome Back"
          subtitle="Login to test your Ethereum knowledge and compete on the leaderboard"
          buttonText="Sign In"
          onSubmit={handleLogin}
          redirectText="Don't have an account?"
          redirectLink="/trivia/signup"
          redirectLinkText="Sign Up"
        />
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;