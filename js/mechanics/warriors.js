function dismissWarriors(){
    if (game.armyCost === 0) return
    let flag = false
    while (getResource("coins") + getNextResource("coins") < 0) {
        if (getResource("horseWarrior") > 0) {dismissHorseWarrior(); flag = true}
        else if (getResource("swordsWarrior") > 0) {dismissWarrior("swords"); flag = true}
        else if (getResource("bowWarrior") > 0) {dismissWarrior("bow"); flag = true}
        else {dismissWarrior("axe"); flag = true}
    } 
    if (flag) createTextDialog("The soldiers have no wages to speak of", "You don't have enough gold to pay your soldiers. Some of them have been dismissed and forced to join the civilian population.")   
}

function killWarriors(arrayOfWarriorsToKill) { return arrayOfWarriorsToKill }

function dismissWarrior(weapon){
    add("resources", `${weapon}Warrior`, -1)
    add("resources", "unemployed", 1)
    add("maxResources", weapon, 1)
    add("resources", weapon, 1)
    updateSingleResource("unemployed")
    updateSingleResource(weapon)
    updateDailyCost(false);
}

function dismissHorseWarrior(){
    add("resources", "horseWarrior", -1)
    add("resources", "swordsWarrior", 1)
    add("maxResources", "horse", 1)
    add("resources", "horse", 1)
    updateSingleResource("horse");
    updateDailyCost(false)
}