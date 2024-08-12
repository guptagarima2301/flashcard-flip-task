// backend/controllers/flashcardController.js
const Flashcard = require('../models/Flashcard');

// Get all flashcards
const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flashcards' });
  }
};

// Create a new flashcard
const createFlashcard = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const newFlashcard = new Flashcard({ question, answer });
    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create flashcard' });
  }
};

// Update an existing flashcard
const updateFlashcard = async (req, res) => {
  const { _id } = req.params;
  const { question, answer } = req.body;

  try {
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      _id,
      { question, answer },
      { new: true }
    );
    res.json(updatedFlashcard);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update flashcard' });
  }
};

// Delete a flashcard
const deleteFlashcard = async (req, res) => {
  const { _id } = req.params;

  try {
    await Flashcard.findByIdAndDelete(_id);
    res.json({ message: 'Flashcard deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete flashcard' });
  }
};

module.exports = {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
};
