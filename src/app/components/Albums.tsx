"use client";

import React, { useEffect, useState } from 'react';
import { fetchSpotifyToken, getAlbums } from './api/api'; // Adjust the import path if needed
import Image from 'next/image';

interface Album {
    id: string;
    name: string;
    artist: string;
    release_date: string;
    total_tracks: number;
    imageUrl: string;
    spotifyUrl: string;
}

const Albums: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const token = await fetchSpotifyToken(); // Fetch the Spotify token
                const data = await getAlbums(token); // Fetch albums from Spotify
                setAlbums(data);
            } catch (err) {
                setError('Failed to fetch album details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) {
        return <p className="text-center py-10 text-gray-800">Loading albums...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-600">{error}</p>;
    }

    return (
        <section id="albums" className="py-10 bg-white">
            <h2 className="text-4xl font-bold text-center text-gray-800">
                Top <span className="text-amber-300">Albums</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {albums.map((album) => (
                    <div key={album.id} className="flex flex-col items-center">
                        <Image
                            className="w-64 h-64 object-cover rounded-lg"
                            src={album.imageUrl}
                            alt={album.name}
                            width={100}
                            height={100}
                        />
                        <h3 className="text-2xl font-semibold mt-4">{album.name}</h3>
                        <p className="text-lg text-gray-600">{album.artist}</p>
                        <p className="text-sm text-gray-500">Release Date: {album.release_date}</p>
                        <p className="text-sm text-gray-500">Tracks: {album.total_tracks}</p>
                        <a
                            href={album.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-amber-300 text-black rounded mt-4 hover:bg-amber-200 transition"
                        >
                            Listen on Spotify
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Albums;