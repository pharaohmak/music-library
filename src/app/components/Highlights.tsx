import React from 'react';

const Highlights: React.FC = () => {
    return (
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    Platform <span className="text-amber-300">Highlights</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <i className="fa-solid fa-trophy fa-5x mb-5"></i>

                        <h3 className="text-2xl font-semibold mb-2">Award-Winning Platform</h3>
                        <p className="text-gray-600">
                            Recognized as the top music library for two consecutive years.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <i className="fa-solid fa-volume-high fa-5x mb-5"></i>
                        <h3 className="text-2xl font-semibold mb-2">High-Quality Sound</h3>
                        <p className="text-gray-600">
                            Experience the best sound quality available for all your favorite songs.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <i className="fa-solid fa-bookmark fa-5x mb-5" ></i>
                        <h3 className="text-2xl font-semibold mb-2">Vast Song Library</h3>
                        <p className="text-gray-600">
                            Access over 10,000 songs from a wide range of genres and artists.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;