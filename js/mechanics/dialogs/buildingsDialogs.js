function createBuildingDialog(field) {
    playClick()
    if (!dialogBuildings.includes(field.dataset.building)) return
    if (field.dataset.building === "none") return
    if (game.currentChoosedBuilding !== "none") return displayError("You can't build a building on top of another building")
    if (game.lastFieldBuildedOnListener !== "none") return game.lastFieldBuildedOnListener = "none";
    
    isDialogOpen = true
    const building = field.dataset.building
    const dialog = document.createElement("div")

    dialog.classList.add("dialog_building")
    dialog.classList.add(`dialog_${building}`)

    switch (building) {
        case "marketplace":
            dialog.innerHTML = marketplaceDialogHTML(field, building);
            marketplaceButtonsADDFUN(dialog);
            break;
        case "barracks":
            dialog.innerHTML = barracksDialogHTML(field, building);
            barracksButtonsADDFUN(dialog);
            break;
        case "town_center":
            dialog.classList.remove(`dialog_${building}`)
            dialog.classList.add(`dialog_towncenter`)
            dialog.innerHTML = towncenterDialogHTML(field, building);
            break;
        default:
            dialog.innerHTML = buildingDialogHTML(field, building)
            buyButtonsADDFUN(dialog)
            break;

    }

    //close button
    dialog.querySelector(".closeButton").addEventListener("click", ()=> {
        playClick()
        isDialogOpen = false
        dialog.remove(); 
    })
    dialogContainer.appendChild(dialog)
}

function buyButtonsADDFUN(dialog){
    const tradesRecords = [...dialog.querySelectorAll(".dialog_building-content--trade")]
    for (const tradeRecord of tradesRecords) {

        const buttons = tradeRecord.querySelectorAll("button")
        const tradesDivs = [...tradeRecord.querySelectorAll(".trade-amount")]

        for (const button of buttons) {
            
            button.addEventListener("click", () => {
                playClick()
                let quantity = button.dataset.quantity
                const resource = tradeRecord.dataset.resource
                const trade = tradeRecord.dataset.trade
                const building = tradeRecord.dataset.tradebuilding
                const resourcesArray = game.production[building][trade].output[resource].input

                // is trade available
                if (quantity === "5" && game.production[building][trade].currentAmount < 5) quantity = "all";

                // is enough resources
                for (let i = 0; i < resourcesArray.length; i++) {
                    let requiredAmount = Number(trade[i]) 
                    if (resourcesArray[i] === resourcesArray[i + 1]) continue
                    if (resourcesArray[i] === resourcesArray[i - 1]) requiredAmount = Number(trade[i]) + Number(trade[i - 1])
                 
                    if((quantity === "all" 
                        && game.resources[resourcesArray[i]] < requiredAmount * game.production[building][trade].currentAmount) 
                        || game.resources[resourcesArray[i]] < requiredAmount * Number(quantity)) 
                        return displayError("Not enough resources.");
                }

                // amount that we produce wont overflow max resource
                if (game.resources[resource] 
                    + (quantity === "all" 
                        ? game.production[building][trade].currentAmount 
                        : Number(quantity))
                    * Number(trade.at(-1)) 

                    > game.maxResources[resource]
                ) return displayError("Can't produce more resources than your maximum space")

                // take input resources
                for (let i = 0; i < resourcesArray.length; i++) {

                    let addAmount = Number(trade[i])

                    if (quantity === "5") addAmount *= 5
                    if (quantity === "all") addAmount *= game.production[building][trade].currentAmount
                    if (building === "hunters_hut") {
                        add("nextResources", "wheat", requiredWheat * addAmount)
                        game.changedThisTurn.push("wheat")
                    }
                    

                    add("resources", resourcesArray[i], addAmount * -1)
                    game.changedThisTurn.push(resourcesArray[i])
                }

                // add output resource
                let addAmount = Number(trade.at(-1))
                if (quantity === "5") addAmount *= 5
                if (quantity === "all") addAmount *= game.production[building][trade].currentAmount
                if (building === "stable") {
                    add("nextResources", "wheat", -requiredWheat * addAmount)
                    game.changedThisTurn.push("wheat")
                }
                add("resources", resource, addAmount)
                game.changedThisTurn.push(resource)

                // update times the trade is available 
                if (quantity === "1") game.production[building][trade].currentAmount -= 1
                if (quantity === "5") game.production[building][trade].currentAmount -= 5
                if (quantity === "all") game.production[building][trade].currentAmount = 0

                for (const singleTrade of tradesRecords) {
                    if (singleTrade.dataset.trade === trade){
                        const currentAmountText = singleTrade.querySelector(".trade-amount")
                        currentAmountText.innerText = game.production[building][trade].currentAmount + "x"
                        currentAmountText.dataset.currentamount = game.production[building][trade].currentAmount
                    }
                }

                // update resources from the trade
                updateWhatChanged()
                game.cannotUndo = "trade"
                // push to array of what trades were made
                game.production.changedThisTurn.push([building, trade])
            })
        }
    }
}

function resetTrades(){
    for (const trade of new Set(game.production.changedThisTurn)) {
        game.production[trade[0]][trade[1]].currentAmount = game.production[trade[0]][trade[1]].amount
    }
    game.production.changedThisTurn = []
}


function buildingDialogHTML(field, building){
    const shortPath = game.production[building]
    let inputResources = "";
    // CREATING TRADES RECORDS
    for (const trade in shortPath) {
        for (const resource in shortPath[trade].output) {
            const input = shortPath[trade].output[resource].input
            const currentAmount = shortPath[trade].currentAmount
            let inputAmountAndIcon = "";
            let outputAmountAndIcon = "";

            // trade is a name of an object, like "11" - 
            // in the name it's said that this trade requires one input resource for one output resource. 
            // the last number is always an output amount, so before we reach it,
            // for every number before, we generate single input resource (amount, icon) that's needed in a trade

            for (let i = 0; i < trade.length; i++) {
                if(i === trade.length - 1){
                    outputAmountAndIcon += `<img src="./src/resources/${resource}.png" class="trade-icon">&nbsp${trade[i]}`
                    break
                }
                inputAmountAndIcon += `${trade[i]} &nbsp<img src="./src/resources/${input[i]}.png" class="trade-icon">&nbsp`
            }

            // Adding single trade record
            inputResources += `
                <div class="dialog_building-content--trade" data-trade="${trade}" data-tradeBuilding="${building}" data-resource="${resource}">  
                    <div class="trade-amount" data-currentamount=${currentAmount}>${currentAmount}x</div>
                    <div class="trade-information"> 
                        ${inputAmountAndIcon}
                        &nbsp for &nbsp
                        ${outputAmountAndIcon}
                    </div>
                    <div class="trade-buttons"> 
                        Buy: 
                        <button data-quantity="1" class="trade-button">1</button>
                        <button data-quantity="5" class="trade-button">5</button>
                        <button data-quantity="all" class="trade-button">All</button>
                    </div>
                </div>`
        }
    }

    const ext = gifs.includes(building) ? "gif" : "png";

    const header = `
        <div class="dialog_building-header">
            <h3 class="dialog_building-header--subtitle">
                ${field.dataset.amount} per day.
            </h3>
            <h2 class="dialog_building-header--title">
            ${building.replace("_", " ")}
            </h2>
            
            <img src="./src/buildings/${building}.${ext}" class="dialog_building-header--image">
        </div>`

    const main = `
        <div class="dialog_building-content">
            <div class="dialog_building-content--trades"> 
                    ${inputResources} 
            </div>
          
                <button class="closeButton">Close</button>
          
        </div>`

    
    return header + main
}