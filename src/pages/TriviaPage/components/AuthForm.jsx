import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ethereumIcon from '../../../assets/Eth-logo2.svg';

const AuthForm = ({ 
  title, 
  subtitle, 
  buttonText, 
  showUsername = false, 
  onSubmit, 
  redirectText, 
  redirectLink, 
  redirectLinkText 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await onSubmit({
        email,
        password,
        username
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        delay: i * 0.1
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: 'spring', 
        stiffness: 200, 
        damping: 20 
      }
    }
  };

  const buttonVariants = {
    initial: {
      background: 'linear-gradient(135deg, #7f7fd5, #86a8e7, #91eae4)'
    },
    hover: {
      scale: 1.03,
      background: 'linear-gradient(135deg, #91eae4, #86a8e7, #7f7fd5)',
      boxShadow: '0 8px 25px rgba(127, 127, 213, 0.5)',
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.97
    }
  };
  
  // Log to check if the component is rendering
  console.log("AuthForm rendering", { title, showUsername });

  return (
    <motion.div className="auth-form-container">
      <motion.div 
        className="auth-logo-container"
        initial="hidden"
        animate="visible"
        variants={iconVariants}
      >
        <img src={ethereumIcon} alt="Ethereum Logo" className="auth-logo" />
      </motion.div>
      
      <motion.h1 
        custom={1} 
        initial="hidden" 
        animate="visible" 
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      
      <motion.p 
        className="auth-subtitle" 
        custom={2} 
        initial="hidden" 
        animate="visible" 
        variants={itemVariants}
      >
        {subtitle}
      </motion.p>
      
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="auth-form"
      >
        {showUsername && (
          <motion.div 
            className="form-group" 
            custom={3} 
            initial="hidden" 
            animate="visible" 
            variants={itemVariants}
          >
            <label htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required={showUsername}
              className="auth-input"
              style={{ position: 'relative', zIndex: 30 }}
            />
          </motion.div>
        )}
        
        <motion.div 
          className="form-group" 
          custom={showUsername ? 4 : 3} 
          initial="hidden" 
          animate="visible" 
          variants={itemVariants}
        >
          <label htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="auth-input"
            style={{ position: 'relative', zIndex: 30 }}
          />
        </motion.div>
        
        <motion.div 
          className="form-group" 
          custom={showUsername ? 5 : 4} 
          initial="hidden" 
          animate="visible" 
          variants={itemVariants}
        >
          <label htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="auth-input"
            style={{ position: 'relative', zIndex: 30 }}
          />
        </motion.div>
        
        {/* <motion.button 
          type="submit"
          className="auth-button"
          custom={showUsername ? 6 : 5} 
          initial="hidden" 
          animate="visible" 
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          initial="initial"
          variants={buttonVariants}
          style={{ position: 'relative', zIndex: 30 }}
        >
          {buttonText}
        </motion.button> */}
        <motion.button 
          type="submit"
          className="auth-button"
          custom={showUsername ? 6 : 5}
          // Combine animation properties 
          initial={{ y: 20, opacity: 0 }}  // Combined initial state
          animate={{ y: 0, opacity: 1 }}   // Combined animate state
          whileHover={{ 
            scale: 1.03,
            background: 'linear-gradient(135deg, #91eae4, #86a8e7, #7f7fd5)',
            boxShadow: '0 8px 25px rgba(127, 127, 213, 0.5)'
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ 
            type: 'spring',
            stiffness: 100,
            delay: (showUsername ? 6 : 5) * 0.1
          }}
          style={{ position: 'relative', zIndex: 30 }}
        >
          {buttonText}
        </motion.button>
      </motion.form>
      
      <motion.div 
        className="auth-alt-link"
        custom={showUsername ? 7 : 6} 
        initial="hidden" 
        animate="visible" 
        variants={itemVariants}
      >
        {redirectText} <Link to={redirectLink} className="auth-link">{redirectLinkText}</Link>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;