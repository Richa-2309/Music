const songs = [
    {
        id: 1,
        title: "Summer Vibes",
        artist: "Dream Music",
        image: "https://picsum.photos/80?random=1",
        file: "music/song1.mp3"
    },
    {
        id: 2,
        title: "Night Drive",
        artist: "Alan Walker",
        image: "https://picsum.photos/80?random=2",
        file: "music/song2.mp3"
    },
    {
        id: 3,
        title: "Lost Stars",
        artist: "Adam Levine",
        image: "https://picsum.photos/80?random=3",
        file: "music/song3.mp3"
    },
    {
        id: 4,
        title: "Dream World",
        artist: "Imagine Music",
        image: "https://picsum.photos/80?random=4",
        file: "music/song4.mp3"
    }
];


// Get all songs
const getSongs = (req, res) => {

    res.json(songs);

};


// Get single song
const getSongById = (req, res) => {

    const id = Number(req.params.id);

    const song = songs.find(song => song.id === id);

    if (!song) {

        return res.status(404).json({
            message: "Song not found"
        });

    }

    res.json(song);

};


// Add new song
const addSong = (req, res) => {

    const { title, artist, image, file } = req.body;

    if (!title || !artist || !file) {

        return res.status(400).json({
            message: "Title, artist and file are required"
        });

    }

    const newSong = {

        id: songs.length + 1,

        title,

        artist,

        image: image || "",

        file

    };

    songs.push(newSong);

    res.status(201).json({
        message: "Song added successfully",
        song: newSong
    });

};


// Delete song
const deleteSong = (req, res) => {

    const id = Number(req.params.id);

    const songIndex =
        songs.findIndex(song => song.id === id);

    if (songIndex === -1) {

        return res.status(404).json({
            message: "Song not found"
        });

    }

    const deletedSong =
        songs.splice(songIndex, 1);

    res.json({
        message: "Song deleted successfully",
        song: deletedSong[0]
    });

};


module.exports = {
    getSongs,
    getSongById,
    addSong,
    deleteSong
};
