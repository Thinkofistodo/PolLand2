const dayText = document.querySelector(".day")
const turnNumber = document.querySelector(".turnNumber")
const turnIcon = document.querySelector(".turnIcon")
const seasonIcon = document.querySelector(".seasonIcon")

let startRemovingDayTextTimeout
let RemoveDayTextTimeout

function newTurn() {
    if (game.spectatorMode) return displayError("You pressed the button but the time has stopped for you forever")
    if (isDialogOpen) return
    if (isResourcesDialogOpen) return
    isSave = false
    dismissWarriors();
    killHorses()

    const overflowingResources = []
    const overflowingAmount = []

    for (const resource in game.resources) {
       if (getSeason() === "winter" && (resource === "wheat" || resource === "cotton")) continue

      
        const last = JSON.parse(JSON.stringify(game.resources[resource]))

        if (game.resources[resource] + game.nextResources[resource] >= game.maxResources[resource]) {
            // We calculate how much real resources has been added, not how many was in nextResources object
            // so we can precisly log them in resources dialog
            overflowingResources.push(resource)
            overflowingAmount.push(game.maxResources[resource] - game.resources[resource])

            game.resources[resource] = game.maxResources[resource]
        } else {
            game.resources[resource] += game.nextResources[resource]
        }
       
        
        
        if (game.resources[resource] !== last) game.changedThisTurn.push(resource)
    }
    if (game.cannotUndo !== "nothing") game.cannotUndo = "turn"
    createResourcesDialog(overflowingResources, overflowingAmount)
    updateWhatChanged()
    updateRandomTrades()
    resetTrades()
    clearTimeout(startRemovingDayTextTimeout)
    clearTimeout(RemoveDayTextTimeout)
    dayText.classList.remove("displayNoneDayText")
    dayText.classList.add("showDayText")

    game.turns--;
    changeSeason()

    if (game.daysToNextSeason === seasons[game.currentSeason][1]) dayText.innerHTML= `Day ${++game.currentDay}, ${getSeason()}`
    else dayText.innerText = `Day ${++game.currentDay}`

    startRemovingDayTextTimeout = setTimeout(() => {
        dayText.classList.remove("showDayText")
        RemoveDayTextTimeout = setTimeout(() => {
            dayText.classList.add("displayNoneDayText")
            // css transition length 500ms
        }, 500)
    }, 2000)
    checkIfEvent()
    checkIfGoalAchieved();
    if(checkIfDefeat()) return
    setStoryEvent()
    setTurnNumber();
    checkPeopleNumber()
}

function setTurnNumber() {
    turnNumber.innerText = game.turns
}


function toggleShowTurns(setting) {
    if (setting === "inactive") {
        turnNumber.classList.add("invisible")
        seasonNumber.classList.add("invisible")
        turnIcon.classList.add("invisible")
        seasonIcon.classList.add("invisible")
    }
    if (setting === "active"){
        turnNumber.classList.remove("invisible")
        seasonNumber.classList.remove("invisible")
        turnIcon.classList.remove("invisible")
        seasonIcon.classList.remove("invisible")
    }

}