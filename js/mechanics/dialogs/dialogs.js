const dialogContainer = document.querySelector(".game_content")
const settingsDialog = document.querySelector(".menu_dialog-settings")
let answer = "none"
let isOptionsDialogOpen = false
let isResourcesDialogOpen = false
let isFightDialogOpen = false
function createTextDialog(title, content, isThisFirstDialog, callback){
    isDialogOpen = true
    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_single")
    if (isThisFirstDialog) dialog.style = "z-index: 99999;";
    
    dialog.innerHTML = 
    `
    <h1 class="dialog_single-title">${title}</h1>
    <div class="dialog_single-content">${content}</div>
    <div class="dialog_single-footer"> 
        <button class="dialog_single-closeButton">close</button>
    </div>
    `
    dialog.querySelector("button").addEventListener("click",()=>{
        dialog.remove(); 
        if (!isThisFirstDialog) isDialogOpen = false
        playClick()
        if(callback) callback();
    })
    dialogContainer.appendChild(dialog)
}

function createDefaultEventDialog(title, text, resources) {
    if (!title) {
        let eventID = generateRandomInteger(events.default.length) - 1
        if (game.currentGoal === 0) eventID = generateRandomIntegerMinMax(2,5)
        title = events.default[eventID].title
        text = events.default[eventID].text
        resources = events.default[eventID].resources
    }

    isDialogOpen = true
    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_single")
    dialog.classList.add("dialog_event")

    let items = "";
    for (const resource in resources) {
        items += `<div><span`
        items += resources[resource] > 0 ? `>+` : ` class="substract">`
        items += `${resources[resource]}</span> <img src="./src/resources/${resource}.png"> </div>`
        add("resources", resource, resources[resource])
        game.changedThisTurn.push(resource)
    }

    updateWhatChanged()

    dialog.innerHTML = 
    `
    <h1 class="dialog_single-title">${title}</h1>
    <div class="dialog_single-content">${text}</div>
    <div class="dialog_single-items">${items}</div>
    <div class="dialog_single-footer"> 
        <button class="dialog_single-closeButton">close</button>
    </div>
    `;

   
    dialog.querySelector("button").addEventListener("click",()=>{
        dialog.remove(); 
        addResources(resources)
        isDialogOpen = false
        playClick()
    })
    dialogContainer.appendChild(dialog)
}

function createChoiceEventDialog() {
    const eventID = generateRandomInteger(events.choice.length) - 1
    const {title, text, option1, option2} = events.choice[eventID]

    for (const [resource, amount] of Object.entries(option1.resources)) {
        if (amount < 0 && getResource(resource) < -1 * amount) return 
    }

    isDialogOpen = true
    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_single")
    dialog.classList.add("dialog_event")
    dialog.classList.add("dialog_eventChoice")

    let option1Text = "";
    let option2Text = "";

    if (option1.type === ChoiceEventTypes.resources) {
        for (const resource in option1.resources) {
            option1Text += `<div><span`
            option1Text += option1.resources[resource] > 0 ? `>+` : ` class="substract">`
            option1Text += `${option1.resources[resource]}</span> <img src="./src/resources/${resource}.png"> </div>`
        }
    }

    if (option2.type === ChoiceEventTypes.resources) {
        for (const resource in option2.resources) {
            option2Text += `<div><span`
            option2Text += option2.resources[resource] > 0 ? `>+` : ` class="substract">`
            option2Text += `${option2.resources[resource]}</span> <img src="./src/resources/${resource}.png"> </div>`
        }
    }

    dialog.innerHTML = 
    `
    <h1 class="dialog_single-title">${title}</h1>
    <div class="dialog_single-content">${text}</div>
    <div class="dialog_single-items">
        <div>
            ${option1Text}
        </div>
        <div>
            ${option2Text}
        </div>
    </div>
    <div class="dialog_single-footer"> 
        <button class="dialog_single-closeButton option1">${option1.buttonText}</button>
        <button class="dialog_single-closeButton option2">${option2.buttonText}</button>
    </div>
    `

    dialog.querySelector(".option1").addEventListener("click",()=>{
        dialog.remove(); 
        isDialogOpen = false
        playClick()

        switch (option1.type) {
            case ChoiceEventTypes.nothing:
                return;
            case ChoiceEventTypes.fight:
                return;
            case ChoiceEventTypes.resources:
                addResources(option1.resources)
                updateWhatChanged()
                break;
        }
    })

    dialog.querySelector(".option2").addEventListener("click",()=>{
        dialog.remove(); 
        isDialogOpen = false
        playClick()

        switch (option2.type) {
            case ChoiceEventTypes.nothing:
                return;
            case ChoiceEventTypes.fight:
                return;
            case ChoiceEventTypes.resources:
                addResources(option2.resources)
                updateWhatChanged()
                break;
        }
    })
    dialogContainer.appendChild(dialog)
}

function createResourcesDialog(overflowingResources, overflowingAmount){
    isDialogOpen = true
    isResourcesDialogOpen = true
    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_single")
    dialog.classList.add("dialog_resources")

    let content = "";

    new Set(game.changedThisTurn).forEach(resource => {
        let amount = game.nextResources[resource]
        if (!resourcesDialogOrder.includes(resource)) return
        if (overflowingResources.includes(resource)) amount = overflowingAmount[overflowingResources.indexOf(resource)]
        if (amount === 0) return
        content += `<div class="dialog_resources-wrap" style="order: ${resourcesDialogOrder.indexOf(resource) + 1}"> <img src="./src/resources/${resource}.png"> 
        <span class="dialog_resources-quantity ${amount < 0 ? "substract" : ""}">${amount}</span>
        </div>`;
    });

    dialog.innerHTML = 
    `
    <h1 class="dialog_single-title">Resources</h1>
    <div class="dialog_single-content">
    ${content || "You REALLY didn't get ANYTHING? Damn, bro"} 
    </div>
    <div class="dialog_single-footer"> 
        <button class="dialog_single-closeButton">close</button>
    </div>
    `
    dialog.querySelector("button").addEventListener("click",()=>{
        dialog.remove(); 
        isDialogOpen = false
        isResourcesDialogOpen = false
        playClick()
    })
    dialogContainer.appendChild(dialog)
}

function createDialogsChain(titles, contents, currentPage, allPages){
    isDialogOpen = true

    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_chain")

    dialog.innerHTML = 
    `
    <div class="dialog_chain-titles--Container"> 
        <h1 class="dialog_chain-title">${titles[currentPage]}</h1>
        <h1 class="dialog_chain-page">${currentPage + 1}/${allPages + 1}</h1>
    </div>

    <div class="dialog_chain-content">${contents[currentPage]}</div>
    <div class="dialog_chain-footer"> 
        <button class="dialog_chain-previousButton">←</button>
        <button class="dialog_chain-nextButton">→</button>
        <button class="dialog_chain-closeButton">close</button>
    </div>
    `

    
    
    dialog.querySelector(".dialog_chain-closeButton").addEventListener("click",()=>{
        dialog.remove()
        playClick()
        isDialogOpen = false
    })

    if(currentPage !== allPages){
        dialog.querySelector(".dialog_chain-nextButton").addEventListener("click",()=>{
            createDialogsChain(titles, contents, currentPage + 1, allPages)
            dialog.remove()
            playClick()
        })
    }

    if(currentPage !== 0) {
        dialog.querySelector(".dialog_chain-previousButton").addEventListener("click",()=>{
            createDialogsChain(titles, contents, currentPage - 1, allPages)
            dialog.remove()
            playClick()
        })
    }
    

    dialogContainer.appendChild(dialog)
}

function createOptionsDialog() {
    if (isOptionsDialogOpen) {
        dialogContainer.querySelector(".dialog_options").remove(); 
        isOptionsDialogOpen = false
        isDialogOpen = false
        return
    }

    isOptionsDialogOpen = true
    isDialogOpen = true

    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_options")

    dialog.innerHTML = 
    `
    <h1>Options</h1>
    <button class="dialog_options-menuButton">Menu</button>
    <button class="dialog_options-saveButton">Save</button>
    <button class="dialog_options-settingsButton">Settings</button>
    <button class="dialog_options-closeButton">Close</button>
    `

    dialog
        .querySelector(".dialog_options-closeButton")
        .addEventListener("click",()=> {
            isOptionsDialogOpen = false
            dialog.remove()
            isDialogOpen = false
            playClick()
        })

    dialog
        .querySelector(".dialog_options-menuButton")
        .addEventListener("click",()=> {
            isOptionsDialogOpen = false
            goBackToMenu()
            dialog.remove()
            playClick()
        })

    dialog
        .querySelector(".dialog_options-saveButton")
        .addEventListener("click",()=> {
            isOptionsDialogOpen = false
            createSaveDialog()
            dialog.remove()
            playClick()
        }) 

    dialog
        .querySelector(".dialog_options-settingsButton")
        .addEventListener("click",()=> {
            isOptionsDialogOpen = false
            settingsDialog.classList.add("showDialog")
            dialog.remove()
            playClick()
        })    

    dialogContainer.appendChild(dialog)
    return dialog
}

function createQuestionDialog(question, isMenu, yesCallBack, noCallBack){
    isDialogOpen = true
    const dialog = document.createElement("div")
    dialog.style = "z-index: 99998;";
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_question")
    if(isMenu) dialog.classList.add("dialog_question-menu")

    dialog.innerHTML = `
        <h1>${question}</h1>
        <div class="dialog_question-buttonWrap">
            <button class="dialog_question-yesButton">yes</button>
            <button class="dialog_question-noButton">no</button>
        </div>
        `

    dialog
        .querySelector(".dialog_question-yesButton")
        .addEventListener("click",()=> {
            answer = "yes"
            dialog.remove()
            yesCallBack()
            playClick()
            isDialogOpen = false
        })

    dialog
        .querySelector(".dialog_question-noButton")
        .addEventListener("click",()=> {
            answer = "no"
            dialog.remove()
            if (noCallBack !== undefined) {
                noCallBack()
            }
            playClick()
            isDialogOpen = false
        })

    if(!isMenu) dialogContainer.appendChild(dialog)
    if(isMenu) document.querySelector(".menu_dialog-load").appendChild(dialog)
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function changeColorOfResources(add) {
    for (const resourceNumber of resourcesNumbers)
    if (add) resourceNumber.classList.add("colorWhite");
    else resourceNumber.classList.remove("colorWhite");
}

function goBackToMenu(){
    
    if(!isSaved) return createQuestionDialog("Leave without saving?", false, leave)

    function leave() {
        answer = "none"   
        isOptionsDialogOpen = false
        isDialogOpen = false
    
        // in-game buttons
        document.removeEventListener("keypress", keyCheck) 
        toggleBlockBottomSection("inactive")
        toggleShowTurns("inactive")
        loadingScreen()
        changeSoundtrack(soundtracks.soundtrackMenu)
        inGameSettings = false
        setTimeout(()=>{
            container.innerHTML = ""
            buildings.innerHTML = ""
            menu.classList.remove("hideMenu")
            isAnotherDialogOpen = true
            addBackgroundImage()
            changeColorOfResources(false)
        },1000) 
    }
   
    leave()
   
}

function createSaveDialog(){
    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_save")
    isSaving = true
    dialog.innerHTML = `
        <h1>Save the Game</h1>
        <div>
        <form>
        <input type="text" placeholder="My save name"></input>
        <button type="submit">save</button>
        </form>
        <button class="go-back">back</button>
        </div>
     `
  
    dialog
        .querySelector("form")
        .addEventListener("submit",(e)=>{
            e.preventDefault()
            let saveName = dialog.querySelector("input").value
            if(!saveName) saveName = randomNames[generateRandomInteger(randomNames.length - 1)]
            createSave(saveName)
            playClick()
            dialog.remove()
            createOptionsDialog()
            isSaving = false
        })
   
    dialog
        .querySelector(".go-back")
        .addEventListener("click", ()=> {
            dialog.remove()
            playClick()
            createOptionsDialog()
            isSaving = false
    })

    dialogContainer.appendChild(dialog)
};
