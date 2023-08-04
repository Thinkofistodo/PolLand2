function barracksDialogHTML(field, building) {
    let axeWarrior = `
        <div class="dialog_building-content--trade barracksTrade">  
            <span></span>
            <div class="trade-information"> 

                1&nbsp<img src="./src/resources/unemployed.png" class="trade-icon">&nbsp
                1&nbsp<img src="./src/resources/axe.png" class="trade-icon">&nbsp
                &nbsp for &nbsp
                <img src="./src/resources/axeWarrior.png" class="trade-icon">&nbsp1

            </div>
            <div class="trade-buttons"> 
                <button data-weapon="axe" class="trade-button">Recruit</button>
            </div>
        </div>`

    let swordsWarrior = `
        <div class="dialog_building-content--trade barracksTrade">  
            <span></span>
            <div class="trade-information"> 
                1&nbsp<img src="./src/resources/unemployed.png" class="trade-icon">&nbsp
                1&nbsp<img src="./src/resources/swords.png" class="trade-icon">&nbsp
                &nbsp for &nbsp
                <img src="./src/resources/swordsWarrior.png" class="trade-icon">&nbsp1
            </div>
            <div class="trade-buttons"> 
                <button data-weapon="swords" class="trade-button">Recruit</button>
            </div>
        </div>`

    let bowWarrior = `
        <div class="dialog_building-content--trade barracksTrade">  
            <span></span>
            <div class="trade-information"> 
                1&nbsp<img src="./src/resources/unemployed.png" class="trade-icon">&nbsp
                1&nbsp<img src="./src/resources/bow.png" class="trade-icon">&nbsp
                &nbsp for &nbsp
                <img src="./src/resources/bowWarrior.png" class="trade-icon">&nbsp1
            </div>
            <div class="trade-buttons"> 
                <button data-weapon="bow" class="trade-button">Recruit</button>
            </div>
        </div>`

    let horseWarrior = `
        <div class="dialog_building-content--trade barracksTrade">  
            <span></span>
            <div class="trade-information"> 
                1&nbsp<img src="./src/resources/swordsWarrior.png" class="trade-icon">&nbsp
                1&nbsp<img src="./src/resources/horse.png" class="trade-icon">&nbsp
                &nbsp for &nbsp
                <img src="./src/resources/horseWarrior.png" class="trade-icon">&nbsp1
            </div>
            <div class="trade-buttons"> 
                <button data-weapon="horse" class="trade-button">Recruit</button>
            </div>
        </div>`

    const header = `
        <div class="dialog_building-header">
            
            <h2 class="dialog_building-header--title">Barracks</h2>
            
            <img src="./src/buildings/barracks.png" class="dialog_building-header--image">
        </div>`

    const main = `
        <div class="dialog_building-content">
            <div class="dialog_building-content--trades"> 
                   ${axeWarrior}
                   ${bowWarrior}
                   ${swordsWarrior}
                   ${horseWarrior}
            </div>
            
            <button class="closeButton">Close</button>
        </div>`

    const information = `
        <div class="dialog_building-content--information">
                <h2 class="information_title">Current Daily Cost:</h2>
                <div class="information_container">  
                    <div>
                        <span class="dailyCost">${getDailyCostOfArmy()}</span><img class="information_icon" src="./src/resources/coins.png">/&nbsp<img class="information_icon-svg" src="./src/icons/hourglass.svg">
                    </div>
                </div>
                <h2 class="information_title">Your Army <span class="armyNumber">(${getNumberOfWarriors()}/${game.maxArmy})</span>:</h2>
                <div class="information_container">
                    <div><span class="axeWarriorAmount warriorsAmount">${getResource("axeWarrior")}x</span> <img class="information_icon" src="./src/resources/axeWarrior.png"></div>
                    <div><span class="bowWarriorAmount warriorsAmount">${getResource("bowWarrior")}x</span> <img class="information_icon" src="./src/resources/bowWarrior.png"></div>
                </div>
                <div class="information_container">    
                    <div><span class="swordsWarriorAmount warriorsAmount">${getResource("swordsWarrior")}x</span> <img class="information_icon" src="./src/resources/swordsWarrior.png"></div>
                    <div><span class="horseWarriorAmount warriorsAmount">${getResource("horseWarrior")}x</span> <img class="information_icon" src="./src/resources/horseWarrior.png"></div>
                </div>

                <h2 class="information_title">Unit Cost Per turn</h2>
                <div class="information_container">
                    <div><img class="information_icon" src="./src/resources/axeWarrior.png">&nbsp&nbsp&nbsp${warriorsCost.axeWarrior}<img class="information_icon" src="./src/resources/coins.png">/&nbsp<img class="information_icon-svg" src="./src/icons/hourglass.svg"></div>
                </div>
                <div class="information_container">   
                    <div><img class="information_icon" src="./src/resources/bowWarrior.png">&nbsp&nbsp&nbsp${warriorsCost.bowWarrior}<img class="information_icon" src="./src/resources/coins.png">/&nbsp<img class="information_icon-svg" src="./src/icons/hourglass.svg"></div>
                </div>
                <div class="information_container">    
                    <div><img class="information_icon" src="./src/resources/swordsWarrior.png">&nbsp&nbsp&nbsp${warriorsCost.swordsWarrior}<img class="information_icon" src="./src/resources/coins.png">/&nbsp<img class="information_icon-svg" src="./src/icons/hourglass.svg"></div>
                </div>
                <div class="information_container">      
                    <div><img class="information_icon" src="./src/resources/horseWarrior.png">&nbsp&nbsp&nbsp${warriorsCost.horseWarrior}<img class="information_icon" src="./src/resources/coins.png">/&nbsp<img class="information_icon-svg" src="./src/icons/hourglass.svg"></div>
                </div>
        </div>
    `

    return "<div class='barracksContainer'>" + header + main + "</div>" + information
}

function updateBarracks(type){
    document.querySelector(`.${type}WarriorAmount`).innerText = getResource(`${type}Warrior`)
    document.querySelector(`.armyNumber`).innerText = `(${getNumberOfWarriors()}/${game.maxArmy})`
}

function updateDailyCost(barracksDialogOpen) {
    add("nextResources", "coins" , game.armyCost)
    game.armyCost = getDailyCostOfArmy()
    add("nextResources", "coins" , -1 * game.armyCost)

    if (barracksDialogOpen) document.querySelector(".dailyCost").innerText = game.armyCost 

    updateSpecificWhatChanged(["coins"], "next")
    
}

function barracksButtonsADDFUN(dialog) {
    const buttons = dialog.querySelectorAll("[data-weapon]");
    for (const button of buttons) {
        button.addEventListener("click", () => {
            playClick()
            if (game.maxArmy === getNumberOfWarriors()) return displayError("There is not enough space for new recruits!")
            game.cannotUndo = "barracks"
            const weapon = button.dataset.weapon
            if (weapon === "horse") {
                if (getResource("swordsWarrior") === 0) return displayError("Only a qualified man can become a knight")
                if (getResource("horse") === 0) return displayError("You can't have a knight without a horse!")
                add("resources", "horseWarrior", 1)
                add("resources", "swordsWarrior", -1)
                add("resources", "horse", -1)
                add("maxResources", "horse", -1)
                updateSingleResource("horse")
                updateDailyCost(true)
                updateBarracks("swords");
                
            } else {
                if (getResource("unemployed") === 0) return displayError("You have no man to train.")
                if (getResource(weapon) === 0) return displayError(`You have no ${weapon} to give.`)
                add("resources", `${weapon}Warrior`, 1)
                add("resources", "unemployed", -1)
                add("resources", weapon, -1)
                add("maxResources", weapon, -1)
                updateSingleResource("unemployed")
                updateSingleResource(weapon)
                updateDailyCost(true);
            }
            updateBarracks(weapon);
        })
    }
}