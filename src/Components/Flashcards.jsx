import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Flashcards = () => {
    const navigate = useNavigate();
    useEffect(() => {
        toast("Coming Soon");
        setTimeout(() => {
            navigate(-1);
        }, 5000);
    }, [])
    return (
        <div>
            <ToastContainer />

        </div>
    )
}

export default Flashcards
