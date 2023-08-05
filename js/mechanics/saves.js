let isDeletingSave = false
let isSaved = false
let isSaving = false

function createSave(saveName) {
    let save = JSON.parse(JSON.stringify(game))
    save.name = saveName
    save.quest = 0
    const date = new Date()
    save.date = `${Number(date.getDate()) < 10 ? "0"+ date.getDate() : date.getDate()}.${Number(date.getMonth()) < 10 ? "0"+ date.getMonth() : date.getMonth()}.${date.getFullYear()} ${Number(date.getHours()) < 10 ? "0"+ date.getHours() : date.getHours()}:${Number(date.getMinutes()) < 10 ? "0"+ date.getMinutes() : date.getMinutes() }`
    const saves = JSON.parse(localStorage.getItem("saves") ?? "[]")
    saves.push(save)
    localStorage.setItem("saves", JSON.stringify(saves))
    displayError("The game has been saved.")
    isSaved = true
}

function generateSavesList() {
    const savesFromLocaleStorage = JSON.parse(localStorage.getItem("saves") ?? "[]")
    loadDialog.innerHTML = `<h1 class="menu_dialog-title">Load Game</h1>`

    for (const save of savesFromLocaleStorage) {
        saves[save.name] = save

        const loadButton = document.createElement("div")
        loadButton.classList.add("menu_dialog-loadButton")
        loadButton.id = save.name

        const saveName = document.createElement("p")
        const saveDate = document.createElement("p")
        const saveQuest = document.createElement("p")
        const saveDelete = document.createElement("p")

        saveName.innerText = save.name
        saveName.style = "text-transform: capitalize;"
        saveDate.innerText = save.date
        saveQuest.innerText = `Misja: ${save.quest}`

        saveDelete.innerText = `X`
        saveDelete.id = "delete"
        

        loadButton.appendChild(saveName)
        loadButton.appendChild(saveDate)
        loadButton.appendChild(saveQuest)
        loadButton.appendChild(saveDelete)
        loadDialog.appendChild(loadButton)
    }
    loadButtonsADDFUN()
}

function removeSave(id){

    if(isDeletingSave) return
    isDeletingSave = true

    createQuestionDialog(`Delete save "${id}"?`, true, yesCallback, noCallBack)

    function yesCallback() {
        let saves = JSON.parse(localStorage.getItem("saves"))
        saves = saves.filter(el => !(el.name === id))
        localStorage.setItem("saves", JSON.stringify(saves))
        generateSavesList()
        isDeletingSave = false
        answer = "none"
    }

    function noCallBack() {
        isDeletingSave = false
        answer = "none"
    }

}

