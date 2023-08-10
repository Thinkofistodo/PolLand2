const cancel = document.querySelector(".cancel")
let startRemovingTextTimeout
let removeTextTimeout
let buildingsWraps


function checkIfEnoughResourcesToBuild(){
    for (const resource of game.buildingsCosts[game.currentChoosedBuilding]) {
        // resource[0] - cost, resource[1] - name
        if (game.resources[resource[1]] < resource[0]) {
            displayError("You do not have required resources to build this building.")
            cancelBuilding()
            return true
        }
    }
}

function changeResources(doWeAddOrOpposite){
    const requiredResources = game.buildingsCosts[game.currentChoosedBuilding]
    for (const resource of requiredResources) {
        doWeAddOrOpposite ? add("resources", resource[1], resource[0]) : add("resources", resource[1], -1 * resource[0])
    }
}

function setCurrentChoosedBuilding(id){
    game.currentChoosedBuilding = id
    if (game.currentChoosedBuilding !== "none") playClick();
}

function cancelBuilding(){
    setCurrentChoosedBuilding("none")
    playClick()
    cancel.classList.add("locked")
}

function undoBuilding(){
    if(isDialogOpen) return
    if(game.spectatorMode) return displayError("You want to erase your mistakes not remembering you are erased yourself.")
    if(game.cannotUndo === "marketplace") return displayError("You can't undo marketplace after you checked the trade.")
    if(game.cannotUndo === "bordertower") return displayError("You can't unsee what you have seen")
    if(game.cannotUndo === "turn") return displayError("You can only undo a construction you made in the current turn.")
    if(game.cannotUndo === "nothing") return displayError("You haven't build anything yet.")
    if(game.cannotUndo === "no") return displayError("You cannot undo the construction of more than one building")
    if(game.cannotUndo === "trade") return displayError("You cannot undo the building after you traded")
    if(game.cannotUndo === "geologist") return displayError("You cannot undo after placing geologist")
    if(game.cannotUndo === "barracks") return displayError("You cannot undo after recruiting.")

    fields[game.lastFieldBuildedOn].dataset.building = "none"
    fields[game.lastFieldBuildedOn].dataset.listener = false
    cancelBuildingMechanic(fields[game.lastFieldBuildedOn], game.lastBuildedBuilding)

    game.currentChoosedBuilding = game.lastBuildedBuilding
    if (game.currentChoosedBuilding !== "house") add("resources", "unemployed", 1)
    add("resources", "workers", 1)
    changeResources(true)

    game.currentChoosedBuilding = "none"

    updateWhatChanged()
    displayError("The building is demolished. The materials have been returned.")
    game.cannotUndo = "no"
}

function buildingsEventsADDFUN(){
    buildingsWraps = [...document.querySelectorAll(".buildings_building")]
    for (let index = 0; index < buildingsWraps.length; index++) {
        buildingsWraps[index].addEventListener("click", () => {
            if (isDialogOpen) return
            setCurrentChoosedBuilding(buildingsWraps[index].dataset.id)
            cancel.classList.remove("locked")
        })  
    }
    for (let index = 0; index < fields.length; index++) {
        fields[index].addEventListener("click", () => {
            construct(fields, index);
            setCurrentChoosedBuilding("none")
            cancel.classList.add("locked")
        })

    }
    

    // STARTING TOWN CENTER ADD FUNCTIOANLITY
    // fields[712].addEventListener("click", () => {
    //     createBuildingDialog(fields[712])
    //     playClick()
    // })
    // fields[712].dataset.listener = "true"

    cancel.addEventListener("click", cancelBuilding)
}
