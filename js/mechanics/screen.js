const endScreen = document.querySelector(".endScreen")

function showEndScreen(titleText, reasonText) {
    document.querySelector(".dialog_resources").style.display = "none";
    const title = endScreen.querySelector(".endScreen_title")
    const reason = endScreen.querySelector(".endScreen_reason")
    title.innerText = titleText
    reason.innerText = reasonText
    endScreen.style.display = "flex";
    return true;
}

function hideEndScreen() {
    endScreen.style.display = "none";
}


function loseScreenButtonsADDFUN(){
    const goToMenu = document.querySelector(".endScreen_menuButton")
    const newGame = document.querySelector(".endScreen_newGameButton")
    const spectate = document.querySelector(".endScreen_spectateButton")
  
    goToMenu.addEventListener("click", async () => {
        isSaved = true
        isResourcesDialogOpen = false
        goBackToMenu();
        setTimeout(()=>{hideEndScreen()}, 1000) 
    })

    newGame.addEventListener("click",()=> {
        loadingScreen()
        currentPlaying.pause()
        setTimeout(()=>{
            isResourcesDialogOpen = false
            hideMenu()
            hideEndScreen()
            container.innerHTML = ""
            buildings.innerHTML = ""
            for (const dialog of [...document.querySelectorAll(".dialog_single")]) dialog.remove()
            
            startGame("reset")
        }, 1000) 
        
    })

    // Spectate

    spectate.addEventListener("click",()=> {
            hideEndScreen()
            game.spectatorMode = true
    })
}

loseScreenButtonsADDFUN()