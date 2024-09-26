// Define interfaces for Spotify data
interface PlaylistItem {
    id: string;
    name: string;
    owner: { display_name: string };
    external_urls: { spotify: string };
    images: { url: string }[];
}

interface Playlist {
    id: string;
    title: string;
    artist: string;
    originalPrice: number;
    salePrice: number;
    url: string;
    imageUrl: string;
}

interface AlbumItem {
    id: string;
    name: string;
    artists: { name: string }[];
    release_date: string;
    total_tracks: number;
    images: { url: string }[];
    external_urls: { spotify: string };
}

interface Album {
    id: string;
    name: string;
    artist: string;
    release_date: string;
    total_tracks: number;
    imageUrl: string;
    spotifyUrl: string;
}

// Function to fetch Spotify token
export const fetchSpotifyToken = async (): Promise<string> => {
    const clientId = process.env.NEXT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_APP_SPOTIFY_CLIENT_SECRET;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch token: ${errorData.error_description}`);
    }

    const data = await response.json();
    return data.access_token;
};

// Function to fetch playlists from Spotify
export const getPlaylists = async (token: string): Promise<Playlist[]> => {
    const fetchWebApi = async (endpoint: string, method: string = 'GET'): Promise<any> => {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorData.error.message}`);
        }

        return await res.json();
    };

    // Fetching featured playlists
    const data = await fetchWebApi('v1/browse/featured-playlists');
    const playlists: Playlist[] = data.playlists.items.map((item: PlaylistItem) => ({
        id: item.id,
        title: item.name,
        artist: item.owner.display_name,
        originalPrice: 0, // Placeholder if price info is needed later
        salePrice: 0,     // Placeholder if price info is needed later
        url: item.external_urls.spotify,
        imageUrl: item.images[0]?.url || '',
    }));
    return playlists;
};

// Function to fetch multiple albums from Spotify by IDs
export const getAlbums = async (token: string): Promise<Album[]> => {
    const albumIds = '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc'; // Replace with album IDs
    const response = await fetch(`https://api.spotify.com/v1/albums?ids=${albumIds}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`);
    }

    const data = await response.json();
    const albums: Album[] = data.albums.map((album: AlbumItem) => ({
        id: album.id,
        name: album.name,
        artist: album.artists[0]?.name || 'Unknown Artist',
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        imageUrl: album.images[0]?.url || '',
        spotifyUrl: album.external_urls.spotify,
    }));

    return albums;
};