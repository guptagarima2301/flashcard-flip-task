// src/components/FlashcardList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flashcard from './Flashcard';
import './FlashcardList.css';

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleGoToAdmin = () => {
    navigate('/admin'); // Navigate to the Admin route
  };

  return (
    <div className="flashcard-list">
      <Flashcard flashcard={flashcards[currentIndex]} />
      <div className="navigation-buttons">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <button className="admin-button" onClick={handleGoToAdmin}>Go to Admin Dashboard</button>
    </div>
  );
}

export default FlashcardList;
