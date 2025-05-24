import React from 'react';
import './card.css'; // Import external CSS

const Card = (props) => {


    console.log(props.achievement)


  return (
    <div className="card-wrapper">
      <div 
      className="cardabout" 
     style={{ backgroundImage: `url(${props.achievement.image})` }}>
       
        <div className="card__content">
        <h3 className="card__title">{props.achievement.title}</h3>
        <p className="card__subtitle">
          <strong>Conducted By:</strong> {props.achievement.conductedby} 
        </p>
        <p  className="card__subtitle">
             <strong>Mode:</strong> {props.achievement.Mode}
        </p>
        <p className="card__winner">
         <strong>Winner:</strong> {props.achievement.winner}
        </p>
        <p className="card__description">{props.achievement.description}</p>
      </div>
      </div>
    </div>
  );
};

export default Card;
