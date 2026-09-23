const express = require("express");

const router = express.Router();

const {
    getSongs,
    getSongById,
    addSong,
    deleteSong
} = require("../controllers/musicController");


// GET all songs
router.get("/", getSongs);


// GET one song
router.get("/:id", getSongById);


// ADD song
router.post("/", addSong);


// DELETE song
router.delete("/:id", deleteSong);


module.exports = router;
