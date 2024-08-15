const pool = require('./connection');

// Retrieve all flashcards
const getFlashcards = async (pageSize, offset) => {
    try {
        const [flashcards] = await pool.query('SELECT * FROM flashcards LIMIT ? OFFSET ?', [parseInt(pageSize), offset]);
        const [totalRows] = await pool.query('SELECT COUNT(*) AS count FROM flashcards');
        return { flashcards, total: totalRows[0].count };
    } catch (err) {
        console.error('Error fetching flashcards:', err);
        throw err;
    }
};

// Add a new flashcard
const addFlashcard = async (question, answer) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
            [question, answer]
        );
        console.log('Flashcard added with ID:', result.insertId);
        return result.insertId;
    } catch (err) {
        console.error('Error adding flashcard:', err);
        throw err;
    }
};

// Update an existing flashcard
const updateFlashcard = async (id, question, answer) => {
    try {
        const [result] = await pool.query(
            'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
            [question, answer, id]
        );
        console.log('Flashcard updated:', result.affectedRows);
        return result.affectedRows;
    } catch (err) {
        console.error('Error updating flashcard:', err);
        throw err;
    }
};

// Delete a flashcard
const deleteFlashcard = async (id) => {
    try {
        const [result] = await pool.query('DELETE FROM flashcards WHERE id = ?', [id]);
        console.log('Flashcard deleted:', result.affectedRows);
        return result.affectedRows;
    } catch (err) {
        console.error('Error deleting flashcard:', err);
        throw err;
    }
};

// Retrieve a single flashcard by ID
const getFlashcardById = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM flashcards WHERE id = ?', [id]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('Flashcard not found');
        }
    } catch (err) {
        console.error('Error fetching flashcard:', err);
        throw err;
    }
};

module.exports = { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard, getFlashcardById };
