const { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard, getFlashcardById } = require('../db/flashcard');

// Get all flashcards
const getFlashCard = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        const result = await getFlashcards(pageSize, offset);
        res.json({ success: true, ...result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch flashcards' });
    }
};

// Add a new flashcard
const addFlashCard = async (req, res) => {
    const { question, answer } = req.body;
    const questionImage = req.files && req.files.questionImage ? req.files.questionImage[0].buffer : null;
    const answerImage = req.files && req.files.answerImage ? req.files.answerImage[0].buffer : null;

    try {
        const id = await addFlashcard(question, answer, questionImage, answerImage);
        res.status(201).json({ id });
    } catch (err) {
        console.error('Error adding flashcard:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an existing flashcard
const updateFlashCard = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const questionImage = req.files && req.files.questionImage ? req.files.questionImage[0].buffer : null;
    const answerImage = req.files && req.files.answerImage ? req.files.answerImage[0].buffer : null;

    try {
        const affectedRows = await updateFlashcard(id, question, answer, questionImage, answerImage);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Flashcard updated' });
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (err) {
        console.error('Error updating flashcard:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a flashcard
const deleteFlashCard = async (req, res) => {
    const { id } = req.params;

    try {
        const affectedRows = await deleteFlashcard(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Flashcard deleted' });
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (err) {
        console.error('Error deleting flashcard:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getFlashCard, addFlashCard, updateFlashCard, deleteFlashCard };
