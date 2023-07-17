const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const songs = [
{
    name: "music-1",
    title: "La Vaca Lola",
    artist: "ToyCantando"
},
{
    name: "music-2",
    title: "Un Elefante",
    artist: "Toobys Español"
},
{
    name: "music-3",
    title: "chuchuwa",
    artist: "Cartoon Studio"
}
]

let isPlaying = false;
let volume = 1;

const playMusic = ()=>{
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add("anime");
};

const pauseMusic = ()=>{
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove("anime");
};

play.addEventListener('click',()=>{
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

const loadSongs = (songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src = "assets/songs/" + songs.name + ".mp3";
    img.src = "assets/images/" + songs.name + ".jpg";

}

songIndex = 0;
loadSongs(songs[0]);

const nextSong = ()=>{
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};

const prevSong = ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};

next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)

document.addEventListener("keydown", keyPressed);

function keyPressed(event) {
  const keyUsed = event.key;
  if (keyUsed === " ") {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  } else if (keyUsed === "ArrowRight") {
    nextSong();
  } else if (keyUsed === "ArrowLeft") {
    prevSong();
  } else if (keyUsed === "ArrowUp") {
    adjustVolume(0.1);
  } else if (keyUsed === "ArrowDown") {
    adjustVolume(-0.1);
  }
}

function adjustVolume(volumeChange) {
  volume += volumeChange;
  if (volume < 0) {
    volume = 0;
  } else if (volume > 1) {
    volume = 1;
  }

  music.volume = volume;
}