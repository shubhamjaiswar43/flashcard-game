import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-blue-800 to-blue-500 text-white h-screen flex flex-col items-center justify-between">

            <header className="w-full text-center py-12">
                <h1 className="text-3xl lg:text-5xl font-bold mb-4">Welcome to Flashcard Gaming</h1>
                <p className="text-xl">Sharpen your skills, challenge your friends, and learn something new!</p>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <Link to="/flashcards" className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold text-2xl py-4 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
                    Get Started
                </Link>
            </main>

            <footer className="w-full text-center py-8">
                <p className="text-lg">
                    Admin ?&nbsp;
                    <Link to="/login" className="text-yellow-300 underline hover:text-yellow-400">
                        Click here
                    </Link>
                </p>
            </footer>
        </div>
    );
}

export default Home;
