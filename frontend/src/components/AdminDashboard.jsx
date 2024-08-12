// src/components/AdminDashboard.js
import React, { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ flashcards, addFlashcard, editFlashcard, deleteFlashcard }) {
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  const handleAdd = () => {
    addFlashcard(newFlashcard);
    setNewFlashcard({ question: '', answer: '' });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="add-flashcard">
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
        />
        <button onClick={handleAdd}>Add Flashcard</button>
      </div>
      <ul className="flashcard-list">
        {flashcards.map((flashcard, index) => (
          <li key={index} className="flashcard-item">
            <input
              type="text"
              value={flashcard.question}
              onChange={(e) => editFlashcard(index, { ...flashcard, question: e.target.value })}
            />
            <input
              type="text"
              value={flashcard.answer}
              onChange={(e) => editFlashcard(index, { ...flashcard, answer: e.target.value })}
            />
            <button onClick={() => deleteFlashcard(flashcard._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
