import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [flashcards, setFlashcards] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('add'); // 'add', 'update', or 'delete'
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);
    const [form, setForm] = useState({
        question: '',
        answer: '',
        // question_image: null,
        // answer_image: null,
    });

    useEffect(() => {
        if (!localStorage.getItem('isAdmin'))
            navigate('/');
        fetchFlashcards();
    }, [page]);

    const fetchFlashcards = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKENDHOST}/api/flashcard?page=${page}&pageSize=${pageSize}`;
            const res = await axios.get(url);
            console.log(res);
            setFlashcards(res.data.flashcards);
            setTotal(res.data.total);
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
                // question_image: null,
                // answer_image: null,
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
    const makeAPICall = async (url, method, body) => {
        let res = await await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body
        });
        res = await res.json();
        return res.success;
    }
    const handleSubmit = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKENDHOST}/api/flashcard`;
            if (dialogType === 'add') {
                if (await makeAPICall(url + '/add', "POST", JSON.stringify(form)))
                    toast.success('Flashcard added');
                else
                    toast.error('Something Went Wrong');
            } else if (dialogType === 'update') {
                if (await makeAPICall(`${url}/update/${form.id}`, "PUT", JSON.stringify(form)))
                    toast.success('Flashcard updated');
                else
                    toast.error('Something Went Wrong');
            } else if (dialogType === 'delete') {
                if (await makeAPICall(`${url}/delete/${form.id}`, "DELETE", null))
                    toast.success('Flashcard deleted');
                else
                    toast.error('Something Went Wrong');
            }
            fetchFlashcards();
            handleCloseDialog();
        } catch (error) {
            toast.error('Failed to perform the operation');
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }
    return (
        <div className="p-4">
            <ToastContainer />
            <Button sx={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => navigate('/')}>Home</Button>
            <Button sx={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => navigate('/flashcards')}>Flashcards</Button>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog('add')}>Add Flashcard</Button>
            <Button sx={{
                float: 'right',
                backgroundColor: '#f00000',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'darkred'
                }
            }} variant="contained" onClick={handleLogout}>Log Out</Button>
            <div className="mt-4">
                {flashcards.map((flashcard) => (
                    <div key={flashcard.id} className="mb-4 p-4 border border-gray-300 rounded">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{flashcard.question}</h3>
                            <div>
                                <Button sx={{ marginRight: '10px' }} variant="contained" color="secondary" onClick={() => handleOpenDialog('update', flashcard)}>Update</Button>
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
                    {/* <input
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
                    /> */}
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
