const clickToStart = document.querySelector(".clickToStart")
const bird = document.querySelector(".bird")

function hideStartingScreens() {
        clickToStart.style = "display: none";
        bird.style = "display: none";
        currentPlaying.play();
}

clickToStart.addEventListener("click", hideStartingScreens)
bird.addEventListener("click", hideStartingScreens)
