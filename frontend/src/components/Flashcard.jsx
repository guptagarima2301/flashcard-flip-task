import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Check if flashcard is defined and has question and answer properties
  if (!flashcard || !flashcard.question || !flashcard.answer) {
    return <p>Loading...</p>; // or some other placeholder
  }

  return (
    <div className={`flashcard-container`}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-content">
          <div className="flashcard-front">
            <p>{flashcard.question}</p>
          </div>
          <div className="flashcard-back">
            <p>{flashcard.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;





