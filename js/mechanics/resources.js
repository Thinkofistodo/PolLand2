function add(type, name, amount) {
    game[type][name] += Number(amount)
    if (game.resources[name] > game.maxResources[name]) {
        game.resources[name] = game.maxResources[name]
    }

    if (game.resources[name] < 0 && name !== "food") game.resources[name] = 0;

    game.changedThisTurn.push(name)
}

function addResources(resources) {
    for (const resource in resources) {

        game.resources[resource] += Number(resources[resource])

        if (game.resources[resource] > game.maxResources[resource]) {
            game.resources[resource] = game.maxResources[resource]
        }

        if (game.resources[resource] < 0 && resource !== "food") game.resources[resource] = 0;

        game.changedThisTurn.push(resource)

    }


}


function updateAllResources() {
    for (const resource in game.resources) {
        switch (resource) {
            case "axeWarrior":
            case "swordsWarrior":
            case "bowWarrior":
            case "horseWarrior":
                continue;
        }
        const p = document.querySelector(`#${resource}`)
        p.querySelector(`[data-current]`).innerText = game.resources[resource];
        p.querySelector(`[data-maximum]`).innerText = game.maxResources[resource];
        p.querySelector(`[data-next]`).innerText = "(" + game.nextResources[resource] + ")";

    }
    game.changedThisTurn = []
}

function updateWhatChanged() {
    for (const resource of new Set(game.changedThisTurn)) {
        switch (resource) {
            case "axeWarrior":
            case "swordsWarrior":
            case "bowWarrior":
            case "horseWarrior":
                continue;
        }

        const p = document.querySelector(`#${resource}`)
        p.querySelector(`[data-current]`).innerText = game.resources[resource];
        p.querySelector(`[data-maximum]`).innerText = game.maxResources[resource];
        if (seasons[game.currentSeason][0] !== "winter" || (resource !== "wheat" && resource !== "cotton")) {
            p.querySelector(`[data-next]`).innerText = "(" + game.nextResources[resource] + ")";
        }

    }
    game.changedThisTurn = []
}

function updateSingleResource(resource) {
    const p = document.querySelector(`#${resource}`)
    p.querySelector(`[data-current]`).innerText = game.resources[resource];
    p.querySelector(`[data-maximum]`).innerText = game.maxResources[resource];
    p.querySelector(`[data-next]`).innerText = "(" + game.nextResources[resource] + ")";

}

function setCottonAndWheatUI() {
    if (getSeason() === "winter") {
        document.querySelector(`#wheat`).querySelector(`[data-next]`).innerText = "(0)";
        document.querySelector(`#cotton`).querySelector(`[data-next]`).innerText = "(0)";
    } else {
        document.querySelector(`#wheat`).querySelector(`[data-next]`).innerText = "(" + game.nextResources.wheat + ")";
        document.querySelector(`#cotton`).querySelector(`[data-next]`).innerText = "(" + game.nextResources.cotton + ")";
    }

}

function updateSpecificWhatChanged(resources, symbol) {
    for (const resource of resources) {
        const p = document.querySelector(`#${resource}`)
        switch (symbol) {
            case "current":
                p.querySelector(`[data-current]`).innerText = game.resources[resource];
                break
            case "maximum":
                p.querySelector(`[data-maximum]`).innerText = game.maxResources[resource];
                break;
            case "next":
                p.querySelector(`[data-next]`).innerText = "(" + game.nextResources[resource] + ")";
                break;
        }

    }
}

function getResource(resource) {
    return game.resources[resource];
}

function getNextResource(resource) {
    return game.nextResources[resource]
}

function getMaxResource(resource) {
    return game.maxResources[resource]
}

function getDailyCostOfArmy() {
    return (
        game.resources[`axeWarrior`] * warriorsCost.axeWarrior +
        game.resources[`bowWarrior`] * warriorsCost.bowWarrior +
        game.resources[`swordsWarrior`] * warriorsCost.swordsWarrior +
        game.resources[`horseWarrior`] * warriorsCost.horseWarrior
    )
}

function getRecourses(resources) {
    let sum = 0;
    for (const resource of resources) sum += getResource(resource)
    return sum
}

function getNumberOfWarriors() {
    return (
        game.resources[`axeWarrior`] +
        game.resources[`bowWarrior`] +
        game.resources[`swordsWarrior`] +
        game.resources[`horseWarrior`]
    )
}

function getTypeResource(type, resource) {
    return game[type][resource];
}

function checkPeopleNumber() {
    if ((game.resources.people - 25 * game.tax) >= tax.peopleNeededForTax)
        add("nextResources", "coins", tax.taxAmount);
    updateSingleResource("coins");
}