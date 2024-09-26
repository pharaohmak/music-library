"use client";
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Image from 'next/image';

const Nav: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [iconLoaded, setIconLoaded] = useState(false); // Track if icons are loaded

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        // Load Font Awesome dynamically (or consider including it in the _document.js or _app.js for SSR)
        const script = document.createElement('script');
        script.src = 'https://kit.fontawesome.com/a076d05399.js'; // Replace with your Font Awesome kit URL
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => setIconLoaded(true); // Mark icons as loaded
        return () => {
            document.body.removeChild(script); // Cleanup on unmount
        };
    }, []);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <a href="/">
                    <Image className="h-auto" src={logo} alt="Library Logo" width={100} height={100} />
                </a>
                <ul className="hidden md:flex space-x-6">
                    <li><a href="#" className="hover:text-amber-200 cursor-not-allowed">Home</a></li>
                    <li><a href="#" className="hover:text-amber-200 cursor-not-allowed">Contact</a></li>
                    <li><a href="#" className="text-amber-200 cursor-not-allowed">Account</a></li>
                </ul>
                <button className="md:hidden" onClick={openMenu}>
                    {iconLoaded ? <i className="fas fa-bars text-xl" /> : <span>☰</span>} {/* Fallback if icon isn't loaded */}
                </button>
            </div>
            {menuOpen && (
                <div className="md:hidden">
                    <button onClick={closeMenu} className="text-white">
                        {iconLoaded ? <i className="fas fa-times text-xl" /> : <span>✖</span>} {/* Fallback if icon isn't loaded */}
                    </button>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="block">Home</a></li>
                        <li><a href="/songs" className="block">Songs</a></li>
                        <li><a className="block">Contact</a></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Nav;