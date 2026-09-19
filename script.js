const songs = [
    {
        title: "Summer Vibes",
        artist: "Dream Music",
        image: "https://picsum.photos/80?random=1",
        duration: "3:42"
    },

    {
        title: "Night Drive",
        artist: "Alan Walker",
        image: "https://picsum.photos/80?random=2",
        duration: "4:12"
    },

    {
        title: "Lost Stars",
        artist: "Adam Levine",
        image: "https://picsum.photos/80?random=3",
        duration: "4:25"
    },

    {
        title: "Dream World",
        artist: "Imagine Music",
        image: "https://picsum.photos/80?random=4",
        duration: "3:55"
    }
];


let currentSong = 0;
let isPlaying = false;
let progress = 0;

const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerImage = document.getElementById("playerImage");

const playButton = document.getElementById("playButton");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const volumeBar = document.getElementById("volumeBar");

const searchInput = document.getElementById("searchInput");


/* Play Song */

function playSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    playerImage.src = song.image;

    totalTime.textContent = song.duration;

    progress = 0;

    progressBar.value = 0;

    currentTime.textContent = "0:00";

    isPlaying = true;

    playButton.textContent = "⏸";
}


/* Play / Pause */

function togglePlay() {

    if (isPlaying) {

        isPlaying = false;

        playButton.textContent = "▶";

    } else {

        isPlaying = true;

        playButton.textContent = "⏸";
    }
}


/* Next Song */

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    playSong(currentSong);
}


/* Previous Song */

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    playSong(currentSong);
}


/* Progress */

setInterval(() => {

    if (!isPlaying) {
        return;
    }

    progress += 0.5;

    if (progress >= 100) {

        progress = 0;

        nextSong();

        return;
    }

    progressBar.value = progress;

    updateTime();

}, 1000);


/* Update Time */

function updateTime() {

    const song = songs[currentSong];

    const durationParts = song.duration.split(":");

    const minutes = parseInt(durationParts[0]);
    const seconds = parseInt(durationParts[1]);

    const totalSeconds =
        minutes * 60 + seconds;

    const playedSeconds =
        Math.floor((progress / 100) * totalSeconds);

    const playedMinutes =
        Math.floor(playedSeconds / 60);

    const remainingSeconds =
        playedSeconds % 60;

    currentTime.textContent =
        `${playedMinutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
}


/* Manual Progress */

progressBar.addEventListener("input", function () {

    progress = this.value;

    updateTime();

});


/* Volume */

volumeBar.addEventListener("input", function () {

    console.log("Volume:", this.value);

});


/* Search */

searchInput.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase();

    const songElements =
        document.querySelectorAll(".song");

    songElements.forEach(song => {

        const songName =
            song.dataset.name.toLowerCase();

        if (songName.includes(searchValue)) {

            song.style.display = "flex";

        } else {

            song.style.display = "none";

        }

    });

});