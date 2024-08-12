import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);      // To handle error state

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/flashcards');
        
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the response data as JSON
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const addFlashcard = async (flashcard) => {
    try {
      const response = await fetch('http://localhost:5000/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flashcard),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newFlashcard = await response.json();
      setFlashcards([...flashcards, newFlashcard]);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const editFlashcard = async (_id, updatedFlashcard) => {
    try {
      const response = await fetch(`http://localhost:5000/api/flashcards/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFlashcard),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedCard = await response.json();
      setFlashcards(flashcards.map(card => (card._id === _id ? updatedCard : card)));
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/flashcards/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFlashcards(flashcards.filter(card => card._id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Routes>
          <Route
            path="/"
            element={<FlashcardList flashcards={flashcards} />}
          />
          <Route
            path="/admin"
            element={
              <AdminDashboard
                flashcards={flashcards}
                addFlashcard={addFlashcard}
                editFlashcard={editFlashcard}
                deleteFlashcard={deleteFlashcard}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
