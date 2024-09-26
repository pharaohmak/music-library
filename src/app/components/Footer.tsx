import React from 'react';
import Link from 'next/link';
import logo from '../assets/logo.png'
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <div className="flex justify-center mb-4">
                    <Link href="/">
                        <Image
                            src={logo} // Update the path to your logo
                            alt="My Music Library Logo"
                            className="h-auto"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <div className="flex justify-center mb-4">
                    <a>
                        <span className="mx-4 hover:text-gray-400 cursor-not-allowed">Home</span>
                    </a>
                    <a>
                        <span className="mx-4 hover:text-gray-400 cursor-not-allowed">Songs</span>
                    </a>
                    <a className="mx-4 hover:text-gray-400 cursor-not-allowed">Account</a>
                </div>
                <div className="text-gray-400">
                    &copy; {new Date().getFullYear()} My Music Library. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;