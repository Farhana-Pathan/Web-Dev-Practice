const nasheedImage = document.getElementById("nasheed-image");
const nasheedName = document.getElementById("nasheed-name");
const nasheedArtist = document.getElementById("nasheed-artist");

const nasheedSlider = document.getElementById("slider");

const playpauseBtn = document.getElementById("playpause-nasheed");
const prevNasheedBtn = document.getElementById("prev-nasheed");
const nextNasheedBtn = document.getElementById("next-nasheed");
const repeatNasheedBtn = document.getElementById("repeat-nasheed");
const shuffleNasheedBtn = document.getElementById("shuffle-nasheed")

const nasheed = [
    {
        image: "images/al-aqsa.jpg",
        name: "Darbuna Darbun",
        artist: "Yasser Farouk Abu Ammar",
        audio: "audio/darbona-darb-taweel.mp3"
    },
    {
        image: "images/madinah.jpg",
        name: "Kon Anta",
        artist: "Humood Alkhudher",
        audio: "audio/Kon_Anta.mp3"
    },
    {
        image: "images/makka.jpg",
        name: "Yanabi Salam Alik",
        artist: "Maher Zain",
        audio: "audio/Yanabi_salam_alik.mp3"
    }
];

const audio = document.createElement("audio");
let currentNasheedIndex= 0;
updateNasheed();

//previous button
prevNasheedBtn.addEventListener("click", function(){

    currentNasheedIndex--;

    if (currentNasheedIndex < 0){
        currentNasheedIndex = nasheed.length - 1; // go to last song
    }

    updateNasheed();
});

//next button
let isShuffle = false;
shuffleNasheedBtn.addEventListener("click", function(){
    isShuffle = !isShuffle;
    console.log("Shuffle:"+ isShuffle)
});

//next and shuffle button 
nextNasheedBtn.addEventListener("click", function(){
    
    if(isShuffle){
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * nasheed.length);
        } while (randomIndex === currentNasheedIndex);

        currentNasheedIndex = randomIndex;

    } else {
        currentNasheedIndex++;

        if(currentNasheedIndex >= nasheed.length){
            currentNasheedIndex = 0;
        }
    }

    updateNasheed();
});

//repeat button
let repeatMode = "off"; 

//different repeat states + user UI change accoring to the mood
repeatNasheedBtn.addEventListener("click", function(){

    if(repeatMode === "off"){
        repeatMode = "all";
        repeatNasheedBtn.style.color = "green";

    } else if(repeatMode === "all"){
        repeatMode = "one";
         repeatNasheedBtn.style.color = "yellow";

    } else {
        repeatMode = "off";
         repeatNasheedBtn.style.color = "black";
    }

    console.log("Repeat mode:", repeatMode);
});

//when nasheed ends 
audio.addEventListener("ended", function(){

    if(repeatMode === "one"){
        audio.currentTime = 0;
        audio.play();

    } else if(repeatMode === "all"){
        nextNasheedBtn.click();

    } else {

        if(currentNasheedIndex < nasheed.length - 1){
            nextNasheedBtn.click();
        }
    }

});


//playpause button
playpauseBtn.addEventListener("click", function(){
    if(!audio.paused){
        audio.pause()

    }else{
        audio.play();
    }

    
});

//Update 
function updateNasheed(){
    const currentNasheed = nasheed[currentNasheedIndex];

    nasheedImage.src = currentNasheed.image;
    nasheedName.innerText = currentNasheed.name;
    nasheedArtist.innerText = currentNasheed.artist;

    audio.src = currentNasheed.audio;
    
    audio.onloadedmetadata = function(){
        nasheedSlider.value = 0;
        nasheedSlider.max = audio.duration;
    }
    
}

//Slider thumb movement while playing 
audio.addEventListener("timeupdate", function(){
    nasheedSlider.value = audio.currentTime;
});
//Slide jump
nasheedSlider.addEventListener("input", function(){
    audio.currentTime = Number(nasheedSlider.value);
});


