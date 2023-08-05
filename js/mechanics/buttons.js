const settingsButton = document.querySelector("[data-settings]")
const nextTurnButton = document.querySelector("[data-nextTurn]")
const undoBuildingButton = document.querySelector(".undo")

nextTurnButton.addEventListener("click", newTurn)
undoBuildingButton.addEventListener("click", undoBuilding)
settingsButton.addEventListener("click", createOptionsDialog)