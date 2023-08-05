<<<<<<< HEAD
const moveButtons = [...document.querySelectorAll("[data-move]")]

const moves = {
    "up": layersOfFieldsAroundY,
    "down": layersOfFieldsAroundY,
    "right": layersOfFieldsAroundX,
    "left": layersOfFieldsAroundX,
}

let shiftY = -1 * layersOfFieldsAroundY - 1
let shiftX = -1 * layersOfFieldsAroundX - 1

function moveButtonsADDFUN() {
    for (const button of moveButtons) {
        button.addEventListener("click", (e)=>{
            const direction = e.target.dataset.move
            moveMap(direction)
        })
    }
}

function isBorderReachedInThis(direction){
    if (moves[direction] === 0 || moves[direction] === 1) return true
}

function moveMap(direction){
    if(isDialogOpen) return
    if(direction === "center") { 
        shiftY = -1 * layersOfFieldsAroundY - 1
        shiftX = -1 * layersOfFieldsAroundX - 1
        for (const direction in moves) {
            moves[direction] = layersOfFieldsAroundX
        }
        setContainerCSS()
        return
    }

    if(isBorderReachedInThis(direction)) return

    switch(direction){
        case "down":
            shiftY += 2
            moves["up"] = moves["up"] + 2
            moves["down"] = moves["down"] - 2
            break
        case "up":
            shiftY -= 2
            moves["down"] = moves["down"] + 2
            moves["up"] = moves["up"] - 2
            break
        case "right":
            shiftX += 2
            moves["left"] = moves["left"] + 2
            moves["right"] = moves["right"] - 2
            break
        case "left":
            shiftX -= 2
            moves["right"] = moves["right"] + 2
            moves["left"] = moves["left"] - 2
            break
    }
    setContainerCSS()
}

function setContainerCSS(){
    container.style = containerGridNumber + `--shiftX: ${shiftX}; --shiftY: ${shiftY}`
}

setContainerCSS()
=======
const moveButtons = [...document.querySelectorAll("[data-move]")]

const moves = {
    "up": layersOfFieldsAroundY,
    "down": layersOfFieldsAroundY,
    "right": layersOfFieldsAroundX,
    "left": layersOfFieldsAroundX,
}

let shiftY = -1 * layersOfFieldsAroundY - 1
let shiftX = -1 * layersOfFieldsAroundX - 1

function moveButtonsADDFUN() {
    for (const button of moveButtons) {
        button.addEventListener("click", (e)=>{
            const direction = e.target.dataset.move
            moveMap(direction)
        })
    }
}

function isBorderReachedInThis(direction){
    if (moves[direction] === 0 || moves[direction] === 1) return true
}

function moveMap(direction){
    if(isDialogOpen) return
    if(direction === "center") { 
        shiftY = -1 * layersOfFieldsAroundY - 1
        shiftX = -1 * layersOfFieldsAroundX - 1
        for (const direction in moves) {
            moves[direction] = layersOfFieldsAroundX
        }
        setContainerCSS()
        return
    }

    if(isBorderReachedInThis(direction)) return

    switch(direction){
        case "down":
            shiftY += 2
            moves["up"] = moves["up"] + 2
            moves["down"] = moves["down"] - 2
            break
        case "up":
            shiftY -= 2
            moves["down"] = moves["down"] + 2
            moves["up"] = moves["up"] - 2
            break
        case "right":
            shiftX += 2
            moves["left"] = moves["left"] + 2
            moves["right"] = moves["right"] - 2
            break
        case "left":
            shiftX -= 2
            moves["right"] = moves["right"] + 2
            moves["left"] = moves["left"] - 2
            break
    }
    setContainerCSS()
}

function setContainerCSS(){
    container.style = containerGridNumber + `--shiftX: ${shiftX}; --shiftY: ${shiftY}`
}

setContainerCSS()
>>>>>>> cd0ae3922d304ec2bb9668cd0fb6fa2aca23da1a
moveButtonsADDFUN()