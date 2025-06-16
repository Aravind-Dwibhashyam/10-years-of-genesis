import { useState } from 'react';
import { motion } from 'framer-motion';

const QuizComponent = ({ question, questionIndex, onAnswerSelect, selectedAnswer }) => {
  const [textInput, setTextInput] = useState('');
  
  const handleOptionClick = (optionId) => {
    onAnswerSelect(question.id, optionId);
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
    onAnswerSelect(question.id, e.target.value.trim().toLowerCase());
  };

  return (
    <motion.div 
      className="question-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: questionIndex * 0.1 } 
      }}
    >
      <h3>{questionIndex + 1}. {question.question || question.text}</h3>
      
      {question.type === 'mcq' ? (
        // Multiple Choice Question
        <div className="options-container">
          {Object.entries(question.options).map(([optionId, optionText]) => (
            <div 
              className={`option ${selectedAnswer === optionId ? 'selected' : ''}`} 
              key={optionId}
              onClick={() => handleOptionClick(optionId)}
            >
              <input 
                type="radio" 
                id={`q${question.id}-${optionId}`}
                name={`question-${question.id}`}
                checked={selectedAnswer === optionId}
                onChange={() => {}} // Handled by the parent div's onClick
              />
              <label htmlFor={`q${question.id}-${optionId}`}>
                {optionId}. {optionText}
              </label>
            </div>
          ))}
        </div>
      ) : (
        // Fill in the Blank Question
        <div className="fib-container">
          <input
            type="text"
            className="fib-input"
            placeholder="Type your answer here"
            value={textInput}
            onChange={handleTextChange}
          />
        </div>
      )}
    </motion.div>
  );
};

export default QuizComponent;