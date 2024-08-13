import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { toast } from 'react-toastify';

const Admin = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5); // Fixed page size, or you could make this dynamic
    const [total, setTotal] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('add'); // 'add', 'update', or 'delete'
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);
    const [form, setForm] = useState({
        question: '',
        answer: '',
        question_image: null,
        answer_image: null,
    });

    useEffect(() => {
        fetchFlashcards();
    }, [page]);

    const fetchFlashcards = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKENDHOST}/api/flashcard/get?page=${page}&pageSize=${pageSize}`;
            console.log(url);
            const res = await axios.get(url);
            console.log(res);
            // setFlashcards(data.flashcards);
            // setTotal(data.total);
        } catch (error) {
            toast.error('Failed to fetch flashcards');
        }
    };

    const handleOpenDialog = (type, flashcard = null) => {
        setDialogType(type);
        setSelectedFlashcard(flashcard);
        if (flashcard) {
            setForm(flashcard);
        } else {
            setForm({
                question: '',
                answer: '',
                question_image: null,
                answer_image: null,
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedFlashcard(null);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (dialogType === 'add') {
                await axios.post('/api/flashcards', form, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Flashcard added');
            } else if (dialogType === 'update') {
                await axios.put(`/api/flashcards/${selectedFlashcard.id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Flashcard updated');
            } else if (dialogType === 'delete') {
                await axios.delete(`/api/flashcards/${selectedFlashcard.id}`);
                toast.success('Flashcard deleted');
            }
            fetchFlashcards();
            handleCloseDialog();
        } catch (error) {
            toast.error('Failed to perform the operation');
        }
    };

    return (
        <div className="p-4">
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog('add')}>Add Flashcard</Button>
            <div className="mt-4">
                {flashcards.map((flashcard) => (
                    <div key={flashcard.id} className="mb-4 p-4 border border-gray-300 rounded">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{flashcard.question}</h3>
                            <div>
                                <Button variant="contained" color="secondary" onClick={() => handleOpenDialog('update', flashcard)}>Update</Button>
                                <Button variant="outlined" color="error" onClick={() => handleOpenDialog('delete', flashcard)}>Delete</Button>
                            </div>
                        </div>
                        <p>{flashcard.answer}</p>
                    </div>
                ))}
            </div>
            <Pagination
                count={Math.ceil(total / pageSize)}
                page={page}
                onChange={(e, value) => setPage(value)}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} Flashcard</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Question"
                        type="text"
                        fullWidth
                        name="question"
                        value={form.question}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Answer"
                        type="text"
                        fullWidth
                        name="answer"
                        value={form.answer}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="question_image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="answer_image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">{dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Admin;
