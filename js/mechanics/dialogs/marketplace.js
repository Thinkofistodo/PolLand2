function marketplaceDialogHTML(field, building){
    game.cannotUndo = "marketplace"
    const header = `
        <div class="dialog_building-header">
            <h3 class="dialog_building-header--subtitle">
                ${game.marketplaces} per day.
            </h3>
            <h2 class="dialog_building-header--title">Marketplace</h2>
            <img src="./src/buildings/marketplace.png" class="dialog_building-header--image">
        </div>`

    const main = `
        <div class="dialog_building-content">
            <div class="dialog_building-content--trades"> 
                ${getRandomTrades()} 
            </div>
                <button class="closeButton">Close</button>
        </div>`

    return header + main
}

function getRandomTrades() {    
    let trades = "";
    for (const [inputResource, outputResource, trade, amount] of game.trades){
        trades += `
        <div class="dialog_building-content--trade" 
            data-trade="${trade}" "
            data-currentamount="${amount}"
            data-tradebuilding="marketplace" 
            data-inputresource="${inputResource}"  
            data-outputresource="${outputResource}"
        >  
           
            <div class="trade-amount">${amount}x</div>
            <div class="trade-information"> 
                &nbsp${trade[0]}<img src="./src/resources/${inputResource}.png" class="trade-icon">&nbsp
                for &nbsp
                <img src="./src/resources/${outputResource}.png" class="trade-icon">&nbsp${trade[1]}
            </div>

            <div class="trade-buttons"> 
                Buy: 
                <button data-quantity="1" class="trade-button">1</button>
                <button data-quantity="5" class="trade-button">5</button>
                <button data-quantity="all" class="trade-button">All</button>
            </div>
        </div>`
    }

    return trades
}

function updateRandomTrades() {
    const numberOfTrades = game.marketplaces;
    if (numberOfTrades === 0) return
    game.trades = []
    for (let i = 0; i < numberOfTrades; i++) addNewRandomTrade()
}

function addNewRandomTrade() {
    // Economy array contains trade that looks like:
    // [resource, buyValueMin, buyValueMax, sellValueMin, sellValueMax, minAmount, maxAmount]
    //                                    economy.length - 1
    const randomResource = generateRandomInteger(economy.length - 1)
    const resourceName = economy[randomResource][0]
    const buyValue = generateRandomIntegerMinMax(economy[randomResource][1], economy[randomResource][2])
    const sellValue = generateRandomIntegerMinMax(economy[randomResource][3], economy[randomResource][4])
    const amount = generateRandomIntegerMinMax(economy[randomResource][5], economy[randomResource][6])

    let trade;
    let inputResource;
    let outputResource;

    const buyOrSell = generateRandomInteger(2) - 1;

    if (buyOrSell) {
        inputResource = "coins"
        outputResource = resourceName
        trade =`${buyValue}${1}`
    } else {
        inputResource = resourceName
        outputResource = "coins"
        trade =`${1}${sellValue}`
    }

    game.trades.push([
        inputResource,
        outputResource,
        trade,
        amount
    ])
}

function marketplaceButtonsADDFUN(dialog){
    const tradesRecords = [...dialog.querySelectorAll(".dialog_building-content--trade")]
    for (const tradeRecord of tradesRecords) {

        const inputResource = tradeRecord.dataset.inputresource;
        const outputResource = tradeRecord.dataset.outputresource;
        const trade = tradeRecord.dataset.trade;
        let currentAmount = tradeRecord.dataset.currentamount;
       
        const buttons = tradeRecord.querySelectorAll("button")

        for (const button of buttons) {
            
            button.addEventListener("click", () => {
                playClick()
                const quantity = button.dataset.quantity

                // is trade available
                if (quantity === "5" && currentAmount < 5) quantity = "all";

                // is enough resources
                if ((quantity === "all" 
                    && game.resources[inputResource] < Number(trade[0]) * currentAmount) 
                    || game.resources[inputResource] < Number(trade[0]) * Number(quantity)
                ) return displayError("Not enough resources.");
                

                // amount that we produce wont overflow max resource
                if(outputResource !== "coins") 
                if (game.resources[outputResource] 
                    + (quantity === "all" 
                        ? currentAmount
                        : Number(quantity)
                      )
                    * Number(trade[1]) 

                    > game.maxResources[outputResource]
                ) return displayError("Can't produce more resources than your maximum space")

                // take input resources
                let addAmount = Number(trade[0])
                if (quantity === "5") addAmount *= 5
                if (quantity === "all") addAmount *= currentAmount
                add("resources", inputResource, -1 * addAmount)
                game.changedThisTurn.push(inputResource)
                

                // add output resource
                addAmount = Number(trade[1])
                if (quantity === "5") addAmount *= 5
                if (quantity === "all") addAmount *= currentAmount
                add("resources", outputResource, addAmount)
                game.changedThisTurn.push(outputResource)

                // update times the trade is available 
                if (quantity === "1") currentAmount -= 1
                if (quantity === "5") currentAmount -= 5
                if (quantity === "all") currentAmount = 0
                tradeRecord.querySelector(".trade-amount").innerText = currentAmount + "x"
                tradeRecord.dataset.currentamount = currentAmount

                // update resources from the trade
                updateWhatChanged()
                game.cannotUndo = "trade"
            })
        }
    }
}