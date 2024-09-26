import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-10">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-bold">Most Awarded Music Platform</h1>
                <p className="mt-4 text-lg">
                    Discover new favorite tunes with <span className="text-yellow-300">My Music Library</span>
                </p>
                <a href="#albums">
                    <button className="mt-6 bg-yellow-300 text-black px-6 py-2 rounded-lg">
                        Browse Songs
                    </button>
                </a>
            </div>
        </header>
    );
};

export default Header;