function killHorses() {
    if (getResource("horse") === 0) return 
    if (getResource("wheat") >= getResource("horse") * requiredWheat) return
    if (getResource("wheat") + getNextResource("wheat") >= 0) return
        const horsesToDie = Math.floor((getResource("horse") * requiredWheat - getResource("wheat")) / 2);
        add("resources", "horse", -1 * horsesToDie)
        add("nextResources", "wheat", requiredWheat * horsesToDie)
        game.changedThisTurn.push("wheat", "horse")
}

function killHorses() {
    const horses = getResource("horse")
    const wheat = getResource("wheat")
    const nextWheat = getNextResource("wheat")
    const horseWarrior = getResource("horseWarrior")

    if (!horses && !horseWarrior) return 
    if (wheat + nextWheat >= 0) return

    let horsesToDie = -1 * Math.floor((wheat + nextWheat) / 2);
    if (horsesToDie === 0) horsesToDie = 1
    if (horsesToDie > horses) for (let i = 0; i < horsesToDie - horses; i++) dismissHorseWarrior()
    
    add("resources", "horse", -1 * horsesToDie)
    add("nextResources", "wheat", requiredWheat * horsesToDie)
    game.changedThisTurn.push("wheat", "horse")
    createTextDialog("The horses are dead", "You didn't provide enough wheat to feed your horses. Some of them starved to death.")
}


