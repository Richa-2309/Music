
const songs = [
    {
        id: 1,
        title: "Summer Vibes",
        artist: "Dream Music",
        album: "Summer Collection",
        image: "https://picsum.photos/80?random=1",
        file: "music/song1.mp3"
    },
    {
        id: 2,
        title: "Night Drive",
        artist: "Alan Walker",
        album: "Night Collection",
        image: "https://picsum.photos/80?random=2",
        file: "music/song2.mp3"
    },
    {
        id: 3,
        title: "Lost Stars",
        artist: "Adam Levine",
        album: "Begin Again",
        image: "https://picsum.photos/80?random=3",
        file: "music/song3.mp3"
    },
    {
        id: 4,
        title: "Dream World",
        artist: "Imagine Music",
        album: "Dream Collection",
        image: "https://picsum.photos/80?random=4",
        file: "music/song4.mp3"
    }
];


// Helper function to find a song by its ID.
// Returns the song index, or -1 if the song doesn't exist.
const findSongIndex = (id) => {
    return songs.findIndex(song => song.id === Number(id));
};


// GET /api/songs
// Get all songs from the music collection.
const getSongs = (req, res) => {

    res.status(200).json({
        success: true,
        count: songs.length,
        songs: songs
    });

};


// GET /api/songs/:id
// Find and return a single song using its ID.
const getSongById = (req, res) => {

    const songIndex = findSongIndex(req.params.id);

    // Return 404 if the requested song doesn't exist.
    if (songIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Song not found"
        });
    }

    res.status(200).json({
        success: true,
        song: songs[songIndex]
    });

};


// POST /api/songs
// Add a new song to the collection.
const addSong = (req, res) => {

    const { title, artist, album, image, file } = req.body;

    // Validate required fields before adding the song.
    if (
        typeof title !== "string" || !title.trim() ||
        typeof artist !== "string" || !artist.trim() ||
        typeof file !== "string" || !file.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Title, artist and file are required"
        });
    }

    // Generate an ID greater than every existing ID.
    // This avoids duplicate IDs after a song is deleted.
    const newId = songs.length === 0
        ? 1
        : Math.max(...songs.map(song => song.id)) + 1;

    // Create the new song object.
    const newSong = {
        id: newId,
        title: title.trim(),
        artist: artist.trim(),
        album: typeof album === "string" ? album.trim() : "",
        image: typeof image === "string" ? image.trim() : "",
        file: file.trim()
    };

    // Save the song in the in-memory collection.
    songs.push(newSong);

    res.status(201).json({
        success: true,
        message: "Song added successfully",
        song: newSong
    });

};


// PUT /api/songs/:id
// Update an existing song using its ID.
// Fields not provided in the request remain unchanged.
const updateSong = (req, res) => {

    const songIndex = findSongIndex(req.params.id);

    // Check whether the song exists.
    if (songIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Song not found"
        });
    }

    const { title, artist, album, image, file } = req.body;

    // Reject invalid values instead of saving incorrect data.
    const fields = { title, artist, album, image, file };

    for (const [key, value] of Object.entries(fields)) {
        if (value !== undefined &&
            (typeof value !== "string" || !value.trim())) {
            return res.status(400).json({
                success: false,
                message: `${key} must be a non-empty string`
            });
        }
    }

    // Update only the fields included in the request.
    const updatedFields = {};

    for (const [key, value] of Object.entries(fields)) {
        if (value !== undefined) {
            updatedFields[key] = value.trim();
        }
    }

    // Keep the original ID unchanged.
    Object.assign(songs[songIndex], updatedFields);

    res.status(200).json({
        success: true,
        message: "Song updated successfully",
        song: songs[songIndex]
    });

};


// DELETE /api/songs/:id
// Remove a song from the collection.
const deleteSong = (req, res) => {

    const songIndex = findSongIndex(req.params.id);

    // Return 404 if no matching song exists.
    if (songIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Song not found"
        });
    }

    // Remove the song and retain the deleted object.
    const deletedSong = songs.splice(songIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: "Song deleted successfully",
        song: deletedSong
    });

};


// GET /api/songs/search?keyword=summer
// Search song titles, artists and albums.
// Matching is case-insensitive.
const searchSongs = (req, res) => {

    const keyword = req.query.keyword;

    // Require a search keyword.
    if (typeof keyword !== "string" || !keyword.trim()) {
        return res.status(400).json({
            success: false,
            message: "Please provide a keyword"
        });
    }

    const searchTerm = keyword.trim().toLowerCase();

    // Find songs matching the keyword in any supported field.
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.album.toLowerCase().includes(searchTerm)
    );

    res.status(200).json({
        success: true,
        count: filteredSongs.length,
        songs: filteredSongs
    });

};


// GET /api/songs/artist/:artist
// Return all songs by a particular artist.
const getSongsByArtist = (req, res) => {

    const artistName = req.params.artist.toLowerCase();

    const filteredSongs = songs.filter(song =>
        song.artist.toLowerCase() === artistName
    );

    res.status(200).json({
        success: true,
        count: filteredSongs.length,
        songs: filteredSongs
    });

};


// GET /api/songs/stats
// Return basic statistics about the music collection.
const getSongStats = (req, res) => {

    // Collect unique artist names.
    const uniqueArtists = [
        ...new Set(songs.map(song => song.artist))
    ];

    res.status(200).json({
        success: true,
        totalSongs: songs.length,
        totalArtists: uniqueArtists.length,
        artists: uniqueArtists
    });

};


// Export controllers so the router can use them.
module.exports = {
    getSongs,
    getSongById,
    addSong,
    updateSong,
    deleteSong,
    searchSongs,
    getSongsByArtist,
    getSongStats
};
