<<<<<<< HEAD
function keyboardADDFUN(){
    document.addEventListener("keypress", keyCheck) 
}

function keyCheck(e){
    if(isSaving) return
    switch (e.key) {
        case 'q':
            newTurn()
            return
        case 'w':
            moveMap("down")
            return
        case 's':
            moveMap("up")
            return
        case 'a':
            moveMap("right")
            return
        case 'd':
            moveMap("left")
            return
        case 'c':
            moveMap("center")
            return
        case 'e':
            undoBuilding()
            return
        case 'r':
            createOptionsDialog()
            return
    }

    // SWITCHING BUILDINGS SECTION
    const id = Number(e.key)
    if (id > 0 && id < 5) {
        if (currentSection != id) {
            changeButtonAppearance(id < currentSection)
            currentSection = id
        }
        // (nextSection, isInputFromKey)
        changeSectionIcon(true, true)
        return
    }
=======
function keyboardADDFUN(){
    document.addEventListener("keypress", keyCheck) 
}

function keyCheck(e){
    if(isSaving) return
    switch (e.key) {
        case 'q':
            newTurn()
            return
        case 'w':
            moveMap("down")
            return
        case 's':
            moveMap("up")
            return
        case 'a':
            moveMap("right")
            return
        case 'd':
            moveMap("left")
            return
        case 'c':
            moveMap("center")
            return
        case 'e':
            undoBuilding()
            return
        case 'r':
            createOptionsDialog()
            return
    }

    // SWITCHING BUILDINGS SECTION
    const id = Number(e.key)
    if (id > 0 && id < 5) {
        if (currentSection != id) {
            changeButtonAppearance(id < currentSection)
            currentSection = id
        }
        // (nextSection, isInputFromKey)
        changeSectionIcon(true, true)
        return
    }
>>>>>>> cd0ae3922d304ec2bb9668cd0fb6fa2aca23da1a
}