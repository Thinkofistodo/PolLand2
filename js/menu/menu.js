<<<<<<< HEAD
const backButtons = [...document.querySelectorAll(".menu_dialog-backButton")]
const loadDialog = document.querySelector(".menu_dialog-loadSaves")
const menuButtonsContainer = document.querySelector(".menu_buttons")
const menuButtons = [...document.querySelectorAll(".menu_button")]
const menuDialogs = [...document.querySelectorAll(".menu_dialog")]
const menu = document.querySelector(".menu")
const blockBottomSection = document.querySelector(".blockBottomSection");
const resourcesNumbers = document.querySelectorAll(".resources_resource-text")

let isAnotherDialogOpen = false
let whatMenuDialogIsOpen = "none"
let inGameSettings = false

function toggleBlockBottomSection(setting) {
    // Buttons works
    if (setting === "inactive") return blockBottomSection.classList.remove("hideMenu")
    // Buttons don't work
    if (setting === "active") return blockBottomSection.classList.add("hideMenu")
}

function hideMenuDialog() {
    const dialog = document.querySelector(".showDialog")
    setTimeout(()=>{
        if (dialog) dialog.classList.remove("showDialog")
    }, 500)
}

function backButtonsADDFUN() {
    backButtons.forEach((backButton, index) => {

        backButton.addEventListener("click", () => {
            menuDialogs[index].scrollTop = 0;
            menuDialogs[index].classList.remove("showDialog")
            if (!inGameSettings) menu.classList.remove("hideMenu");
            if (inGameSettings) createOptionsDialog();
        })
    })
}

function menuButtonsADDFUN() {
    menuButtons[0].addEventListener("click", () => startGame("reset"))
    menuButtons.shift()
    backButtonsADDFUN()
    for (const button of menuButtons) {

        button.addEventListener("click", (e) => {
                if (e.target.id === "1") generateSavesList()
                menu.classList.add("hideMenu");
                menuDialogs[e.target.id - 1].classList.add("showDialog")
            
        })
    }
}

function loadButtonsADDFUN() {
    const buttons = [...document.querySelectorAll(".menu_dialog-loadButton")]
    for (const button of buttons) {
        button.addEventListener("click", (e) => {
            if (e.target.id === "delete") return removeSave(button.id)
            startGame(button.id)
        })
    }
}

function hideMenu(){
    setTimeout(()=>{
        menu.classList.add("hideMenu")
    }, 500)
}

=======
const backButtons = [...document.querySelectorAll(".menu_dialog-backButton")]
const loadDialog = document.querySelector(".menu_dialog-loadSaves")
const menuButtonsContainer = document.querySelector(".menu_buttons")
const menuButtons = [...document.querySelectorAll(".menu_button")]
const menuDialogs = [...document.querySelectorAll(".menu_dialog")]
const menu = document.querySelector(".menu")
const blockBottomSection = document.querySelector(".blockBottomSection");
const resourcesNumbers = document.querySelectorAll(".resources_resource-text")

let isAnotherDialogOpen = false
let whatMenuDialogIsOpen = "none"
let inGameSettings = false

function toggleBlockBottomSection(setting) {
    // Buttons works
    if (setting === "inactive") return blockBottomSection.classList.remove("hideMenu")
    // Buttons don't work
    if (setting === "active") return blockBottomSection.classList.add("hideMenu")
}

function hideMenuDialog() {
    const dialog = document.querySelector(".showDialog")
    setTimeout(()=>{
        if (dialog) dialog.classList.remove("showDialog")
    }, 500)
}

function backButtonsADDFUN() {
    backButtons.forEach((backButton, index) => {

        backButton.addEventListener("click", () => {
            menuDialogs[index].scrollTop = 0;
            menuDialogs[index].classList.remove("showDialog")
            if (!inGameSettings) menu.classList.remove("hideMenu");
            if (inGameSettings) createOptionsDialog();
        })
    })
}

function menuButtonsADDFUN() {
    menuButtons[0].addEventListener("click", () => startGame("reset"))
    menuButtons.shift()
    backButtonsADDFUN()
    for (const button of menuButtons) {

        button.addEventListener("click", (e) => {
                if (e.target.id === "1") generateSavesList()
                menu.classList.add("hideMenu");
                menuDialogs[e.target.id - 1].classList.add("showDialog")
            
        })
    }
}

function loadButtonsADDFUN() {
    const buttons = [...document.querySelectorAll(".menu_dialog-loadButton")]
    for (const button of buttons) {
        button.addEventListener("click", (e) => {
            if (e.target.id === "delete") return removeSave(button.id)
            startGame(button.id)
        })
    }
}

function hideMenu(){
    setTimeout(()=>{
        menu.classList.add("hideMenu")
    }, 500)
}

>>>>>>> cd0ae3922d304ec2bb9668cd0fb6fa2aca23da1a
menuButtonsADDFUN()