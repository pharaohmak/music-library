"use client";

import React, { useEffect, useState } from 'react';
import { fetchSpotifyToken, getPlaylists } from './api/api';
import Playlist from './Playlist';

interface Playlist {
    id: string;
    title: string;
    artist: string;
    originalPrice: number;
    salePrice: number;
    url: string;
    imageUrl: string;
}

const Playlists: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [displayCount, setDisplayCount] = useState<number>(3);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = await fetchSpotifyToken();
                const data = await getPlaylists(token);
                if (Array.isArray(data)) {
                    setPlaylists(data);
                } else {
                    setError("Unexpected data structure.");
                }
            } catch (err) {
                setError(`Failed to fetch playlists: ${(err as Error).message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    const handleLoadMore = () => {
        setDisplayCount(prevCount => Math.min(prevCount + 6, playlists.length)); // Prevent exceeding the number of playlists
    };

    if (loading) {
        return <p className="text-center py-10 text-gray-800">Loading playlists...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-600">{error}</p>;
    }

    return (
        <section id="playlists" className="py-10 bg-white">
            <h2 className="text-4xl font-bold text-center text-gray-800">
                Featured <span className="text-purple-600">Playlists</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {playlists.slice(0, displayCount).map((playlist) => (
                    <Playlist key={playlist.id} playlist={playlist} />
                ))}
            </div>
            {displayCount < playlists.length && (
                <div className="text-center mt-24">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-amber-300 text-black rounded hover:bg-amber-200 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
};

export default Playlists;