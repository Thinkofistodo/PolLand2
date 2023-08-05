<<<<<<< HEAD
const settingsButton = document.querySelector("[data-settings]")
const nextTurnButton = document.querySelector("[data-nextTurn]")
const undoBuildingButton = document.querySelector(".undo")

nextTurnButton.addEventListener("click", newTurn)
undoBuildingButton.addEventListener("click", undoBuilding)
=======
const settingsButton = document.querySelector("[data-settings]")
const nextTurnButton = document.querySelector("[data-nextTurn]")
const undoBuildingButton = document.querySelector(".undo")

nextTurnButton.addEventListener("click", newTurn)
undoBuildingButton.addEventListener("click", undoBuilding)
>>>>>>> cd0ae3922d304ec2bb9668cd0fb6fa2aca23da1a
settingsButton.addEventListener("click", createOptionsDialog)