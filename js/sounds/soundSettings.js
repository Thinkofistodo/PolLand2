const buttons = [...document.querySelectorAll("button"), ...document.querySelectorAll(".playClick")]
const soundtrackMenu = document.querySelector("#soundtrackMenu")

const tale = document.querySelector("#tale")
const lake = document.querySelector("#lake")
const night = document.querySelector("#night")
const heart = document.querySelector("#heart")

const click = document.querySelector("#click")
const placement = document.querySelector("#placement")
const arrow = document.querySelector("#arrow")
const sword = document.querySelector("#sword")

const soundsCheckbox = document.querySelector("#soundsCheckbox")
const soundtracksCheckbox = document.querySelector("#soundtracksCheckbox")
const soundtracksSlider = document.querySelector("#soundtracksSlider")
const soundsSlider = document.querySelector("#soundsSlider")

const battleSoundtrack = document.querySelector("#battleSoundtrack")
const loseBattleSound = document.querySelector("#loseSound")
const winBattleSound = document.querySelector("#winSound")

const soundtracks = {
    tale, 
    lake, 
    night, 
    heart, 
    soundtrackMenu,
    battleSoundtrack
}

const sounds = {
    click,
    loseBattleSound,
    winBattleSound,
    arrow,
    sword
}

const goalsSoundtracks = [
    soundtracks.tale,
    soundtracks.night,
    soundtracks.lake,
    soundtracks.heart
]
    
let currentPlaying = soundtracks.soundtrackMenu

function playClick() {
    click.play()
}

function playClickPlacement() {
    placement.play();
}

function changeSoundtrack(soundtrack) {
    currentPlaying.pause()
    currentPlaying.currentTime = 0;
    setTimeout(()=> {
        soundtrack.play();
        currentPlaying = soundtrack
    }, 3000) 
}

function setVolume(value) {
    for (const soundtrack in soundtracks) 
        soundtracks[soundtrack].volume = value * (1/100)

    for (const sound in sounds) 
       sounds[sound].volume = value * (1/100)

    placement.volume = value  * (1/100) * 2.5
}

function setSoundsVolume(value) {
    
    for (const sound in sounds) 
        sounds[sound].volume = value * (1/100)

    if (value * (1/100) * 2.5 > 1) placement.volume = 1
    else placement.volume = value * (1/100) * 2.5  
}

function pauseSoundtrack() {
    currentPlaying.pause()
}

function resumeSoundtrack(resumeNow) {
    if (resumeNow) return currentPlaying.play()
    setTimeout(()=> currentPlaying.play(), 3000)
}

function playBattleSoundtrack() {
    battleSoundtrack.play()
}

function pauseBattleSoundtrack() {
    battleSoundtrack.pause()
    battleSoundtrack.currentTime = 0;
}

function playWinBattleSound() {
    winBattleSound.play()
}

function playArrow() {
    arrow.play()
}
function playSword() {
    sword.play()
}

function playLoseBattleSound() {
    loseBattleSound.play()
}

function setSoundtracksVolume(value) {
    for (const soundtrack in soundtracks) 
        soundtracks[soundtrack].volume = value * (1/100);
}

soundtracksSlider.addEventListener("input", ()=>{
    if (!soundtracksCheckbox.checked) return
    setSoundtracksVolume(Number(soundtracksSlider.value))
})

soundsSlider.addEventListener("input", ()=>{
    if (!soundsCheckbox.checked) return
    console.log("XD");
    setSoundsVolume(Number(soundsSlider.value))
})

soundsCheckbox.addEventListener("input", ()=> {
    playClick()
    if (soundsCheckbox.checked) setSoundsVolume(Number(soundsSlider.value))
    else setSoundsVolume(0) 
})

soundtracksCheckbox.addEventListener("input", ()=> {
    playClick()
    if (soundtracksCheckbox.checked) setSoundtracksVolume(Number(soundtracksSlider.value))
    else setSoundtracksVolume(0) 
})

for (const button of buttons) {
    button.addEventListener("click", playClick)
}

setVolume(10)
