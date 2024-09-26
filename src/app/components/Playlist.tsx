import Image from 'next/image';
import React from 'react';

interface PlaylistProps {
    playlist: {
        id: string;
        title: string;
        artist: string;
        originalPrice: number;
        salePrice: number;
        url: string;
        imageUrl: string;
    };
}

const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
    const addToPlaylist = (playlistId: string) => {
        console.log(`Playlist with ID ${playlistId} added!`);
        alert(`Added ${playlist.title} to your playlists!`);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <Image className="w-full h-48 object-cover rounded-lg" src={playlist.imageUrl} alt={playlist.title} width={100} height={100} />
            <div className="mt-2 text-lg font-semibold">{playlist.title}</div>
            <div className="text-sm text-gray-600">{playlist.artist}</div>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => addToPlaylist(playlist.id)}
                    className="px-4 py-2 bg-amber-300 text-black rounded hover:bg-amber-200 transition"
                >
                    Add Playlist
                </button>
            </div>
        </div>
    );
};

export default Playlist;