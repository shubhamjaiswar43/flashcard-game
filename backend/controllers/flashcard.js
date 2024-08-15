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
    if (!question || !answer)
        return res.json({ success: false, msg: "Invalid Input!!" })
    try {
        const id = await addFlashcard(question, answer);
        res.status(201).json({ success: true, id });
    } catch (err) {
        console.error('Error adding flashcard:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an existing flashcard
const updateFlashCard = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    if (!question || !answer)
        return res.json({ success: false, msg: "Invalid Input!!" })
    try {
        const affectedRows = await updateFlashcard(id, question, answer);
        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Flashcard updated' });
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
            res.status(200).json({ success: true, message: 'Flashcard deleted' });
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (err) {
        console.error('Error deleting flashcard:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getFlashCard, addFlashCard, updateFlashCard, deleteFlashCard };
