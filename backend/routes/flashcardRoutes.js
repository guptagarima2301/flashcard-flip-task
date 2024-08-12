// backend/routes/flashcardRoutes.js
const express = require('express');
const {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} = require('../controllers/flashcardController');

const router = express.Router();

// Route to get all flashcards
router.get('/', getFlashcards);

// Route to create a new flashcard
router.post('/', createFlashcard);

// Route to update a flashcard
router.put('/:id', updateFlashcard);

// Route to delete a flashcard
router.delete('/:id', deleteFlashcard);

module.exports = router;
