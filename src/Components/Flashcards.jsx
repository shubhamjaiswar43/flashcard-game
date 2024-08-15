import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Flashcards.css'; // Assuming you add this CSS file
import q1 from '../assets/q1.jpeg';
import q2 from '../assets/q2.jpeg';
import q3 from '../assets/q3.jpeg';
import a1 from '../assets/a1.jpeg';
import a2 from '../assets/a2.jpeg';
import a3 from '../assets/a3.jpeg';
const Flashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const questionImages = [q1, q2, q3];
    const answerImages = [a1, a2, a3];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKENDHOST}/api/flashcard`);
                console.log(res);
                setFlashcards(res.data.flashcards);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchFlashcards();
    }, []);

    const handlePrev = () => {
        setIsFlipped(false);
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (flashcards.length === 0) {
        return <div>Loading...</div>;
    }

    const { id, question, answer } = flashcards[currentIndex];
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button
                className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate('/')}
            >
                Home
            </button>
            <button
                className={`absolute top-4 left-28 bg-blue-500 text-white px-4 py-2 rounded ${localStorage.getItem('isAdmin')?"":"hidden"}`}
                onClick={() => navigate('/admin')}
            >
                Admin
            </button>

            <div className="card-container">
                <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                    <div className="front">
                        <img
                            src={questionImages[id % questionImages.length]}
                            alt="Flashcard"
                            className="w-full h-48 object-cover mb-4"
                        />
                        <p className="text-center text-lg font-medium">{question}</p>
                    </div>
                    <div className="back">
                        <img
                            src={answerImages[id % answerImages.length]}
                            alt="Flashcard"
                            className="w-full h-48 object-cover mb-4"
                        />
                        <p className="text-center text-lg font-medium">{answer}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex space-x-4">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    Prev
                </button>
                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={handleFlip}
                >
                    Flip
                </button>
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleNext}
                    disabled={currentIndex === flashcards.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Flashcards;
