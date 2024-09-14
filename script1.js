// let songs;
let songs = [];
let currentSongIndex = 0;
// let currentSong = new Audio();
async function getsongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1].split("(PagalWorld.com.cm)")[0])
        }

    }
    return songs;
}
function secondtomins(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
let currentsong = new Audio();
const playmusic = (track,pause=false) => {
    // let audio = new Audio("/songs/" + track + "(PagalWorld.com.cm).mp3");
    currentsong.src="/songs/" + track + "(PagalWorld.com.cm).mp3"
    if (!pause) {
        currentsong.play()
        play.src="pause.svg"  
        
    }
  document.querySelector(".songinfo").innerHTML=track
  document.querySelector(".songtime").innerHTML="00:00 / 00:00"

}
async function main() {

    songs = await getsongs();
    playmusic(songs[0],true)
    console.log(songs);
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML +
            `<li>
                            <img class=" musicicon invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", "  ")}</div>
                                <div class="artist">Nikhil Mendiratta</div>
                            </div>
                           <div class="playnow">
                            <span>Play now</span>
                            <img src="play.svg" alt="">
                           </div>
                        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild);
            playmusic(e.querySelector(".info>div").innerHTML)
        })
    })
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src="pause.svg"
        }
        else {
            play.src="play.svg"
            currentsong.pause();
        }
    })

    currentsong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML= `${secondtomins(currentsong.currentTime)}/${secondtomins(currentsong.duration)}`
        
        document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*98+
        "%"
    })
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*98
       document.querySelector(".circle").style.left=percent+"%";
       currentsong.currentTime=((currentsong.duration)*percent/98)
    })
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    })
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-150%"
    })

    prev.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Ensuring circular navigation
        playmusic(songs[currentSongIndex]);
    });

    // Next song button click event
    next.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length; // Ensuring circular navigation
        playmusic(songs[currentSongIndex]);
    });
       
    
document.querySelector(".signup").addEventListener("click",()=>{
    console.log('signup is clicked ');
    document.querySelector(".signuppage").style.display="flex";
    document.querySelector(".login").style.display="none";
    
})
document.querySelector(".login").addEventListener("click",()=>{
    console.log('login is clicked ');
    document.querySelector(".loginpage").style.display="flex";
    document.querySelector(".signup").style.display="none";
})
    }


main()
