<<<<<<< HEAD
const gameContent = document.querySelector(".game_content")
let container = document.querySelector(".game_content-fields")
let fields;
let currentBanditCamp = 1;


function generateMap() {

    let containerString = ""
    game.map.forEach((field, id) => {
        const border = field[2] ?? "false"
        const type = types[`${field[0]}`]
        let metal = field[3] ?? ""

        if (!metal) {
            switch (type) {
                case "mountains":
                case "water":
                case "forest":
                    metal = "none"
                    break
                case "ore_field":
                    metal = "iron_ore"
                    break
                case "rocks":
                    metal = "stone"
                    break
                default:
                    let randomNumber = generateRandomInteger(10);
                    if (randomNumber === 10 || randomNumber === 9) metal = "iron_ore"
                    else if (randomNumber === 8 || randomNumber === 7) metal = "coal"
                    else if (randomNumber === 1) metal = "coins"
                    else metal = "stone"
            }
        }
        game.map[id][3] = metal 
        containerString +=
            `<div 
            class="game_content-field" 
            id=${id} 
            data-building="none"
            data-field="${type}" 
            data-border="${border}" 
            data-metal=${metal}
            >
        </div>`
    });
    container.innerHTML = containerString
    fields = [...document.querySelectorAll(".game_content-field")]

    game.map.forEach((field, index) => {
        if (field[1] !== null && field[1] !== undefined) {
            game.currentChoosedBuilding = field[1];
            construct(fields, index, false)
            setCurrentChoosedBuilding("none")
        }
    })

  
    if(!document.querySelector("[data-building=bandit_camp1]")) {

        const banditCamp1Index = banditCamp1SpawnArea[generateRandomInteger(banditCamp1SpawnArea.length) - 1]
        const banditCamp2Index = banditCamp2SpawnArea[generateRandomInteger(banditCamp2SpawnArea.length) - 1]
        const banditCamp3Index = banditCamp3SpawnArea[generateRandomInteger(banditCamp3SpawnArea.length) - 1]
        
        document.getElementById(banditCamp1Index).dataset.building = "bandit_camp1"
        document.getElementById(banditCamp2Index).dataset.building = "bandit_camp2"
        document.getElementById(banditCamp3Index).dataset.building = "bandit_camp3"
        game.map[banditCamp1Index][1] ="bandit_camp1"
        game.map[banditCamp2Index][1] ="bandit_camp2"
        game.map[banditCamp3Index][1] ="bandit_camp3"
    }
}

function construct(fields, index, check = true) {
    const field = fields[index].dataset.field;
    const building = fields[index].dataset.building;
    const border = fields[index].dataset.border
    const choosedBuilding = game.currentChoosedBuilding
    if (check) {
        if (choosedBuilding === "none") return
        if (game.spectatorMode) return displayError("You try to command your people, but the ghosts cannot be heard")
        if (building === "bandit_camp1" || building === "bandit_camp2" || building === "bandit_camp3") return displayError("What's wrong with you?")
        if (building === "geologist" && choosedBuilding === "geologist") return displayError("You already checked this field with geologist.")
        if (building !== "none" && building !== "geologist") return displayError("You can't build a building on top of another building.")
        if (field === "forest") return displayError("You cannot construct a building on the trees.")
        if (field === "water") return displayError("You cannot construct a building in the water.\n Why would you do that?")
        if (field === "mountains") return displayError("Only specific buildings can be placed in the mountains. (Yeah, not really).")
        if (border === "false") return displayError("You cannot construct building on a hidden field.")
        if (choosedBuilding === "farmland" && field === "ore_field") return displayError("You can't place farmland on an iron field. Wtf.")
        if (choosedBuilding === "farmland" && field === "rocks") return displayError("You can't plant wheat on rocks. Wtf.")
        if (getResource("workers") <= 0) return displayError("You have no avaliable workers.")
        if (checkIfEnoughResourcesToBuild()) return

        if (!["house", "worker"].includes(choosedBuilding)) {
            if (getResource("unemployed") < 1) return displayError("There is no available man to work in this building.")
            else add("resources", "unemployed", -1)
        }

        if (choosedBuilding === "marketplace") {
            let flag = 1;
            for (const id of [-1, 1, 45, 46, 47, -45, -46, -47])
                if (fields[index + id].dataset.building === "town_center") flag = 0;
            if (flag) return displayError("You can only build marketplace next to a town center");
        }

        playClickPlacement()

        add("resources", "workers", -1)
        changeResources(false)

    }

    // setting posibbility to undo building
    game.lastFieldBuildedOn = fields[index].id
    game.lastBuildedBuilding = game.currentChoosedBuilding
    game.cannotUndo = false
    game.lastFieldBuildedOnListener = fields[index].id

    // Building info
    fields[index].dataset.building = game.currentChoosedBuilding
    game.map[index][1] = game.currentChoosedBuilding

    //------------------------------------------BUILDING MECHANICS-------------------------------------
    buildingMechanic(fields[index], game.currentChoosedBuilding, true, check);
    updateWhatChanged()
    //-------------------------------------------------------------------------------------------------

    // ADD Dialog functionality
    if (fields[index].dataset.listener !== "true") {
        game.lastFieldBuildedOnListener = "none";
        fields[index].addEventListener("click", () => createBuildingDialog(fields[index]))
        fields[index].dataset.listener = "true"
    }

}

function removeBackgroundImage() {
    gameContent.style = "background-image: none;"
}
function addBackgroundImage() {
    gameContent.style = "background-image: url('./src/backgrounds/bg0.png');"
}
=======
const gameContent = document.querySelector(".game_content")
let container = document.querySelector(".game_content-fields")
let fields;
let currentBanditCamp = 1;


function generateMap() {

    let containerString = ""
    game.map.forEach((field, id) => {
        const border = field[2] ?? "false"
        const type = types[`${field[0]}`]
        let metal = field[3] ?? ""

        if (!metal) {
            switch (type) {
                case "mountains":
                case "water":
                case "forest":
                    metal = "none"
                    break
                case "ore_field":
                    metal = "iron_ore"
                    break
                case "rocks":
                    metal = "stone"
                    break
                default:
                    let randomNumber = generateRandomInteger(10);
                    if (randomNumber === 10 || randomNumber === 9) metal = "iron_ore"
                    else if (randomNumber === 8 || randomNumber === 7) metal = "coal"
                    else if (randomNumber === 1) metal = "coins"
                    else metal = "stone"
            }
        }
        game.map[id][3] = metal 
        containerString +=
            `<div 
            class="game_content-field" 
            id=${id} 
            data-building="none"
            data-field="${type}" 
            data-border="${border}" 
            data-metal=${metal}
            >
        </div>`
    });
    container.innerHTML = containerString
    fields = [...document.querySelectorAll(".game_content-field")]

    game.map.forEach((field, index) => {
        if (field[1] !== null && field[1] !== undefined) {
            game.currentChoosedBuilding = field[1];
            construct(fields, index, false)
            setCurrentChoosedBuilding("none")
        }
    })

  
    if(!document.querySelector("[data-building=bandit_camp1]")) {

        const banditCamp1Index = banditCamp1SpawnArea[generateRandomInteger(banditCamp1SpawnArea.length) - 1]
        const banditCamp2Index = banditCamp2SpawnArea[generateRandomInteger(banditCamp2SpawnArea.length) - 1]
        const banditCamp3Index = banditCamp3SpawnArea[generateRandomInteger(banditCamp3SpawnArea.length) - 1]
        
        document.getElementById(banditCamp1Index).dataset.building = "bandit_camp1"
        document.getElementById(banditCamp2Index).dataset.building = "bandit_camp2"
        document.getElementById(banditCamp3Index).dataset.building = "bandit_camp3"
        game.map[banditCamp1Index][1] ="bandit_camp1"
        game.map[banditCamp2Index][1] ="bandit_camp2"
        game.map[banditCamp3Index][1] ="bandit_camp3"
    }
}

function construct(fields, index, check = true) {
    const field = fields[index].dataset.field;
    const building = fields[index].dataset.building;
    const border = fields[index].dataset.border
    const choosedBuilding = game.currentChoosedBuilding
    if (check) {
        if (choosedBuilding === "none") return
        if (game.spectatorMode) return displayError("You try to command your people, but the ghosts cannot be heard")
        if (building === "bandit_camp1" || building === "bandit_camp2" || building === "bandit_camp3") return displayError("What's wrong with you?")
        if (building === "geologist" && choosedBuilding === "geologist") return displayError("You already checked this field with geologist.")
        if (building !== "none" && building !== "geologist") return displayError("You can't build a building on top of another building.")
        if (field === "forest") return displayError("You cannot construct a building on the trees.")
        if (field === "water") return displayError("You cannot construct a building in the water.\n Why would you do that?")
        if (field === "mountains") return displayError("Only specific buildings can be placed in the mountains. (Yeah, not really).")
        if (border === "false") return displayError("You cannot construct building on a hidden field.")
        if (choosedBuilding === "farmland" && field === "ore_field") return displayError("You can't place farmland on an iron field. Wtf.")
        if (choosedBuilding === "farmland" && field === "rocks") return displayError("You can't plant wheat on rocks. Wtf.")
        if (getResource("workers") <= 0) return displayError("You have no avaliable workers.")
        if (checkIfEnoughResourcesToBuild()) return

        if (!["house", "worker"].includes(choosedBuilding)) {
            if (getResource("unemployed") < 1) return displayError("There is no available man to work in this building.")
            else add("resources", "unemployed", -1)
        }

        if (choosedBuilding === "marketplace") {
            let flag = 1;
            for (const id of [-1, 1, 45, 46, 47, -45, -46, -47])
                if (fields[index + id].dataset.building === "town_center") flag = 0;
            if (flag) return displayError("You can only build marketplace next to a town center");
        }

        playClickPlacement()

        add("resources", "workers", -1)
        changeResources(false)

    }

    // setting posibbility to undo building
    game.lastFieldBuildedOn = fields[index].id
    game.lastBuildedBuilding = game.currentChoosedBuilding
    game.cannotUndo = false
    game.lastFieldBuildedOnListener = fields[index].id

    // Building info
    fields[index].dataset.building = game.currentChoosedBuilding
    game.map[index][1] = game.currentChoosedBuilding

    //------------------------------------------BUILDING MECHANICS-------------------------------------
    buildingMechanic(fields[index], game.currentChoosedBuilding, true, check);
    updateWhatChanged()
    //-------------------------------------------------------------------------------------------------

    // ADD Dialog functionality
    if (fields[index].dataset.listener !== "true") {
        game.lastFieldBuildedOnListener = "none";
        fields[index].addEventListener("click", () => createBuildingDialog(fields[index]))
        fields[index].dataset.listener = "true"
    }

}

function removeBackgroundImage() {
    gameContent.style = "background-image: none;"
}
function addBackgroundImage() {
    gameContent.style = "background-image: url('./src/backgrounds/bg0.png');"
}
>>>>>>> cd0ae3922d304ec2bb9668cd0fb6fa2aca23da1a
