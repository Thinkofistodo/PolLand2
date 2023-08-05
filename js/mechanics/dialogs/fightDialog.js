let order = 0;
const player = []
const deadUnits = {
    axeWarrior: 0,
    bowWarrior: 0,
    swordsWarrior: 0,
    horseWarrior: 0,
}


function countNumberOfAvailableWarriorTypes() {
    let types = 0;
    if (game.resources.axeWarrior > 0) types++;
    if (game.resources.bowWarrior > 0) types++;
    if (game.resources.swordsWarrior > 0) types++;
    if (game.resources.horseWarrior > 0) types++;
    return types;
}

function createFightDialog(attacker, fieldType, enemy, winResources, loseResources, isAvoidable){
    isDialogOpen = true
    isFightDialogOpen = true
    order = 0;
    pauseSoundtrack()
    const dialog = document.createElement("div")
    dialog.classList.add("dialog_small")
    dialog.classList.add("dialog_single")
    dialog.classList.add("dialog_fight")
    dialog.style = `background-image: url('./src/fields/${fieldType}.jpg')`
    let winResourcesUI = "";
    let loseResourcesUI = "";
    for (const [resource, amount] of Object.entries(winResources)) winResourcesUI += `<span>${amount} <img src="./src/resources/${resource}.png"></span>`
    for (const [resource, amount] of Object.entries(loseResources)) loseResourcesUI += `<span>${amount} <img src="./src/resources/${resource}.png"></span>`

    dialog.innerHTML = 
    `
    <h1 class="dialog_fight-roles">
    <p class="dialog_fight-roles--player${attacker === "player" ? " attacker" : " "}">${attacker === "player" ? "Attacker " : "Deffender "}<span class='you'>(YOU)</span></p>
    <p class="dialog_fight-roles--bot${attacker === "player" ? "" : " attacker"}">${attacker === "player" ? "Deffender" : "Attacker"}</p>
    </h1>

    <div class="dialog_fight-field">
        <h2 class="dialog_fight-field--fieldType">${fieldType.replace("_", " ")}</h2>
        <p class="dialog_fight-field--fieldDescription">${fightFieldsDescription[fieldType]}</p>
        <img src="./src/fields/${fieldType}.jpg" class="dialog_fight-field--fieldIcon">
    </div>

    <div class="dialog_fight-switchButtons">${getFightDialogButtons()}</div>

    <div class="dialog_fight-battle">
        <div class="dialog_fight-battle--player"> 
            ${getWarriorFightDialog("axeWarrior")}
            ${getWarriorFightDialog("bowWarrior")}
            ${getWarriorFightDialog("swordsWarrior")}
            ${getWarriorFightDialog("horseWarrior")}
        </div>
        <p class="dialog_fight-battle--VS">VS</p>
        <div class="dialog_fight-battle--bot">
            ${getEnemyWarriorFightDialog(enemy)}
        </div>
    </div>

    <div class="dialog_fight-footer"> 
        <p class="dialog_fight-footer--winResources">
            <span>Win:</span>
            ${winResourcesUI}
        </p>
        <p class="dialog_fight-footer--loseResources">
            <span>Lose:</span> 
            ${loseResourcesUI}
        </p>
        <button class="dialog_single-closeButton dialog_fight-footer--fightButton" ${isAvoidable ? "" : "style='left: 50%; transform: translate(-50%, 50%);'" }>Fight</button>
        ${isAvoidable ? `<button class="dialog_single-closeButton dialog_fight-footer--closeButton">avoid</button>` : ""}
    </div>
    `;

    const swap1 = dialog.querySelector(".swap1")
    const swap2 = dialog.querySelector(".swap2")
    const swap3 = dialog.querySelector(".swap3")

    if (swap1) swap1.addEventListener("click",()=>{
        const order1 = document.querySelector(`[style="order: 1;"]`)
        const order2 = document.querySelector(`[style="order: 2;"]`)
        order1.style.order = 2
        order2.style.order = 1
        playClick()
    })
    
    if (swap2) swap2.addEventListener("click",()=>{
        const order2 = document.querySelector(`[style="order: 2;"]`)
        const order3 = document.querySelector(`[style="order: 3;"]`)
        order2.style.order = 3
        order3.style.order = 2
        playClick()
    })

    if (swap3) swap3.addEventListener("click",()=>{
        const order3 = document.querySelector(`[style="order: 3;"]`)
        const order4 = document.querySelector(`[style="order: 4;"]`)
        order3.style.order = 4
        order4.style.order = 3
        playClick()
    })

    dialog.querySelector(".dialog_fight-footer--fightButton").addEventListener("click", async ()=>{
        playClick()
        setTimeout(()=> playBattleSoundtrack(), 250)
        const deadWarriorsObject = {}
        let people = 0;
        if (await battle(player, enemy, attacker, fieldType)) {
            for (const warrior in deadUnits) if (deadUnits[warrior] !== 0) {
                deadWarriorsObject[warrior] = deadUnits[warrior] * -1
                people -= deadUnits[warrior]
                if (warrior === "horseWarrior") add("maxResources", "horse", deadUnits[warrior])
            }
            createDefaultEventDialog("You lost battle", "You lost", {...loseResources, ...deadWarriorsObject})
            playLoseBattleSound()
            pauseBattleSoundtrack()
            for (const [resource, amount] of Object.entries({...loseResources, ...deadWarriorsObject})) add("resources", resource, amount)
            lastAttackedCamp = ""
        } else {
            if (lastAttackedCamp !== "") {
                game.destroyedCamps.push(lastAttackedCamp);
                document.querySelector(`[data-building=bandit_camp${lastAttackedCamp}]`).dataset.building = "none";
            }
            for (const warrior in deadUnits) if (deadUnits[warrior] !== 0) {
                deadWarriorsObject[warrior] = deadUnits[warrior] * -1
                people -= deadUnits[warrior]
                if (warrior === "horseWarrior") add("maxResources", "horse", deadUnits[warrior])
            }
            pauseBattleSoundtrack()
            createDefaultEventDialog("You won battle", "You won", {...winResources, ...deadWarriorsObject})
            playWinBattleSound()
            for (const [resource, amount] of Object.entries({...winResources, ...deadWarriorsObject, people})) add("resources", resource, amount)
            lastAttackedCamp = ""
        }

        for (const [warrior, amount] of Object.entries(deadWarriorsObject)) add("nextResources", "coins", -1 * warriorsCost[warrior] * amount)

        updateWhatChanged()
        dialog.remove()
        resumeSoundtrack()
        
    })

    const closeButton = dialog.querySelector(".dialog_fight-footer--closeButton");
    if (closeButton) closeButton.addEventListener("click",()=>{
        dialog.remove(); 
        isDialogOpen = false
        isFightDialogOpen = false
        playClick()
        resumeSoundtrack(true)
    })

    dialogContainer.appendChild(dialog)
}

function getEnemyWarriorFightDialog(enemy) {
    let enemyUI = "";
    for (const enemyWarrior of enemy) {
        if (enemyWarrior.amount === 0) continue
        enemyUI += `
        <div class="dialog_fight-battle--unitContainer enemy${enemyWarrior.type}Container"> 
            <img src="./src/resources/${enemyWarrior.type}.png"  class="dialog_fight-battle--unitIcon enemyIcon">
            <p class="dialog_fight-battle--unitAmount">${enemyWarrior.amount}</p>
        </div>`
    }
    return enemyUI
}

function getWarriorFightDialog(warrior) {
    const amount = getResource(warrior);
    if (amount > 0) {
        player.push({
            type: warrior,
            amount,
            damage: warriorsStatistics[warrior].damage,
            hp: warriorsStatistics[warrior].hp,
        })
        return `
        <div class="dialog_fight-battle--unitContainer ${warrior}Container" style="order: ${++order};"> 
            <img src="./src/resources/${warrior}.png"  class="dialog_fight-battle--unitIcon">
            <p class="dialog_fight-battle--unitAmount">${amount}</p>
        </div>
        `
    }
    return "";
}

function getFightDialogButtons() {
    let buttons = ""
    for (let i = 0; i < countNumberOfAvailableWarriorTypes() - 1; i++) buttons += `<button class="swapButton swap${i+1}"> <img src="./src/icons/swap.png"> </button>`;
    return buttons
}

async function battle(player, enemy, attacker, fieldType) {

    const p = (string) => {
        information.innerText = string
            .replaceAll("swordsWarrior", "knights")
            .replaceAll("bowWarrior", "archers")
            .replaceAll("axeWarrior", "hewers")
            .replaceAll("horseWarrior", "cavalry")
    }


    const information = document.querySelector(".dialog_fight-switchButtons")
    information.style.width = "100%";
    p("Battle begins!")

    for (const warrior in deadUnits) deadUnits[warrior] = 0

    for (const button of document.querySelectorAll(".swapButton")) button.style.display = "none";
    const closeButton = document.querySelector(".dialog_fight-footer--closeButton")
    if (closeButton) closeButton.style.display = "none";
    document.querySelector(".dialog_fight-footer--fightButton").style.display = "none";
    
    player.sort((a, b)=> {
        const orderA = Number(document.querySelector(`.${a.type}Container`).style.order)
        const orderB = Number(document.querySelector(`.${b.type}Container`).style.order)
        return orderB - orderA;
    })

    // BONUSY
    switch (fieldType) {
        case "hills":
            attacker === "player" ? enemy[0].amount++ : player[0].amount++
            break;
        case "plains":
            player = player.map(warrior => {
                if (warrior.type === "horseWarrior") warrior.damage = warrior.damage.map(damage => damage + 1)
                return warrior
            });

            enemy = enemy.map(warrior => {
                if (warrior.type === "horseWarrior") warrior.damage = warrior.damage.map(damage => damage + 1)
                return warrior
            });

            break;
        case "swamp":
            player = player.map(warrior => {
                if (warrior.type === "axeWarrior") warrior.damage = warrior.damage.map(damage => damage + 2)
                return warrior
            });

            enemy = enemy.map(warrior => {
                if (warrior.type === "axeWarrior") warrior.damage = warrior.damage.map(damage => damage + 2)
                return warrior
            });
            break;
        case "rocks":
            player = player.map(warrior => {
                if (warrior.type === "swordsWarrior") warrior.damage = warrior.damage.map(damage => damage + 2)
                return warrior
            });

            enemy = enemy.map(warrior => {
                if (warrior.type === "swordsWarrior") warrior.damage = warrior.damage.map(damage => damage + 2)
                return warrior
            });
            break;
        case "ore_field":
            player = player.map(warrior => {
                if (warrior.type === "horseWarrior") warrior.damage = warrior.damage.map(damage => damage - 2 <= 0 ? 1 : damage - 2)
                return warrior
            });

            enemy = enemy.map(warrior => {
                if (warrior.type === "horseWarrior") warrior.damage = warrior.damage.map(damage => damage - 2 <= 0 ? 1 : damage - 2)
                return warrior
            });
            break;
    }

    let playerIndex = 0;
    let enemyIndex = 0;
    let currentPlayerWarrior = player[playerIndex]
    let currentEnemyWarrior = enemy[enemyIndex]

    if (countNumberOfAvailableWarriorTypes() === 0) return true;
    
    nextPlayerWarrior(currentPlayerWarrior.type)
    nextEnemyWarrior("enemy" + currentEnemyWarrior.type)

    let playerHP = [currentPlayerWarrior.amount * currentPlayerWarrior.hp, currentPlayerWarrior.amount * currentPlayerWarrior.hp];
    let enemyHP = [currentEnemyWarrior.amount * currentEnemyWarrior.hp, currentEnemyWarrior.amount * currentEnemyWarrior.hp];

    updateUI(currentPlayerWarrior.type, playerHP[0], playerHP[1])
    updateUI("enemy" + currentEnemyWarrior.type, enemyHP[0], enemyHP[1])

    let firstAttack = 1
    while(1) {
        if (attacker === "player") {
            nextPlayerWarrior(currentPlayerWarrior.type)
            if (firstAttack--) await sleep(750)
            // ATTACK
            attackAnimation(currentPlayerWarrior.type)
            currentPlayerWarrior.type !== "bowWarrior" ? playSword() : playArrow()
            let damage = currentPlayerWarrior.damage[generateRandomInteger(currentPlayerWarrior.damage.length) - 1]
            let attack = currentPlayerWarrior.amount * damage
            
            let bonusDamageInformation = ""
            console.log("HP BOTA: ", enemyHP[0] + " / " + enemyHP[1]);
            if (
            currentPlayerWarrior.type === "swordsWarrior" && currentEnemyWarrior.type === "axeWarrior" || 
            currentPlayerWarrior.type === "horseWarrior" && currentEnemyWarrior.type === "bowWarrior" || 
            currentPlayerWarrior.type === "bowWarrior" && currentEnemyWarrior.type === "swordsWarrior") {
                attack += damage;
                bonusDamageInformation = `${currentPlayerWarrior.type} feel confident against ${currentEnemyWarrior.type}. `
            }



            let unitsCurrentHp = enemyHP[0] - attack
            if (unitsCurrentHp < 0) unitsCurrentHp = 0
            enemyHP[0] = unitsCurrentHp
            console.log("HP BOTA: ", enemyHP[0] + " / " + enemyHP[1]);
            // HERE
            let warriorsKilled =  Math.floor((enemyHP[1] - enemyHP[0]) / currentEnemyWarrior.hp)
            p(`${bonusDamageInformation ?? ""}Your ${currentPlayerWarrior.type} deal ${attack} damage.`)
            currentEnemyWarrior.amount = enemyHP[1] / currentEnemyWarrior.hp - warriorsKilled
            // HERE

            updateUI("enemy" + currentEnemyWarrior.type, enemyHP[0], enemyHP[1])
            await sleep(1000)
            if (bonusDamageInformation) await sleep(1000)

            // CHECK IF WARRIOR DIES
            if (enemyHP[0] === 0) {
                enemyIndex++;
                if (enemyIndex === enemy.length)  {
                    removeWarrior("enemy" + currentEnemyWarrior.type)
                    return false
                } 
                else {
                    removeWarrior("enemy" + currentEnemyWarrior.type)
                    currentEnemyWarrior = enemy[enemyIndex];
                    p(`Enemies send to fight ${currentEnemyWarrior.type}.`)
                    await sleep(500)
                    nextEnemyWarrior("enemy" + currentEnemyWarrior.type)
                    enemyHP = [currentEnemyWarrior.amount * currentEnemyWarrior.hp, currentEnemyWarrior.amount * currentEnemyWarrior.hp];
                    updateUI("enemy" + currentEnemyWarrior.type, enemyHP[0], enemyHP[1])
                    await sleep(500)
                }
            }

            // ARCHERS
            // @TO-DO BŁĄD Z ATAKIEM ŁUCZNIKA
            if (playerIndex !== player.length - 1) {
                if (player[playerIndex + 1].type === "bowWarrior") {
                    attackAnimation("bowWarrior")
                    playArrow()
                    bonusDamageInformation = ""
                    let playerBowWarrior = player[playerIndex + 1]
                    damage = playerBowWarrior.damage[generateRandomInteger(playerBowWarrior.damage.length) - 1]
                    attack = playerBowWarrior.amount * damage
                    console.log("HP BOTA: ", enemyHP[0] + " / " + enemyHP[1]);
                    if (currentEnemyWarrior.type === "swordsWarrior") {
                        attack += damage
                        bonusDamageInformation = "Archers feel confident against knights. "
                    }
                    
                    unitsCurrentHp = enemyHP[0] - attack
                    if (unitsCurrentHp < 0) unitsCurrentHp = 0
                    enemyHP[0] = unitsCurrentHp
                    console.log("HP BOTA: ", enemyHP[0] + " / " + enemyHP[1]);
                    // HERE
                    warriorsKilled =  Math.floor((enemyHP[1] - enemyHP[0]) / currentEnemyWarrior.hp)
                    p(`${bonusDamageInformation ?? ""}Your back line archers deal ${attack} damage.`)
                    currentEnemyWarrior.amount = enemyHP[1] / currentEnemyWarrior.hp - warriorsKilled
                    // HERE

                    updateUI("enemy" + currentEnemyWarrior.type, enemyHP[0], enemyHP[1])
                    await sleep(1000)
                    if (bonusDamageInformation) await sleep(1000)
                }
            }

            // CHECK IF WARRIOR DIES
            if (enemyHP[0] === 0){
                enemyIndex++;
                if (enemyIndex === enemy.length) {
                    removeWarrior("enemy" + currentEnemyWarrior.type)
                    return false
                } 
                else {
                    removeWarrior("enemy" + currentEnemyWarrior.type)
                    currentEnemyWarrior = enemy[enemyIndex];
                    p(`Enemies send to fight ${currentEnemyWarrior.type}.`)
                    await sleep(500)
                    nextEnemyWarrior("enemy" + currentEnemyWarrior.type)
                    enemyHP = [currentEnemyWarrior.amount * currentEnemyWarrior.hp, currentEnemyWarrior.amount * currentEnemyWarrior.hp];
                    updateUI("enemy" + currentEnemyWarrior.type, enemyHP[0], enemyHP[1])
                    await sleep(500)
                }
            }

            attacker = "bot"
        }
    
        if (attacker === "bot") {
            nextEnemyWarrior("enemy" + currentEnemyWarrior.type)
            if (firstAttack--) await sleep(750)
            attackAnimation("enemy" + currentEnemyWarrior.type)
            currentEnemyWarrior.type !== "bowWarrior" ? playSword() : playArrow()

            let damage = currentEnemyWarrior.damage[generateRandomInteger(currentEnemyWarrior.damage.length) - 1]
            let attack = currentEnemyWarrior.amount * damage
            console.log("HP GRACZA: ", playerHP[0] + " / " + playerHP[1]);
            let bonusDamageInformation = ""
            if (
                currentEnemyWarrior.type === "swordsWarrior" && currentPlayerWarrior.type === "axeWarrior" || 
                currentEnemyWarrior.type === "horseWarrior" && currentPlayerWarrior.type === "bowWarrior" || 
                currentEnemyWarrior.type === "bowWarrior" && currentPlayerWarrior.type === "swordsWarrior") {
                    attack += damage;
                    bonusDamageInformation = `${currentEnemyWarrior.type} feel confident against ${currentPlayerWarrior.type}. `
            }

            let unitsCurrentHp = playerHP[0] - attack

            if (unitsCurrentHp < 0) unitsCurrentHp = 0
            lastHP = playerHP[0]
            playerHP[0] = unitsCurrentHp
            console.log("HP GRACZA: ", playerHP[0] + " / " + playerHP[1]);
            // HERE
            let warriorsKilled =  Math.floor((playerHP[1] - playerHP[0]) / currentPlayerWarrior.hp)
            deadUnits[currentPlayerWarrior.type] = warriorsKilled
            p(`${bonusDamageInformation ?? ""}Enemy ${currentEnemyWarrior.type} deal ${attack} damage. `)
            currentPlayerWarrior.amount = playerHP[1] / currentPlayerWarrior.hp - warriorsKilled
            // HERE

            updateUI(currentPlayerWarrior.type, playerHP[0], playerHP[1])
            await sleep(1000)
            if (bonusDamageInformation) await sleep(1000)

            if (playerHP[0] === 0) {
                playerIndex++;
                if (playerIndex === player.length) {
                    removeWarrior(currentPlayerWarrior.type)
                    return true
                } 
                else {
                    removeWarrior(currentPlayerWarrior.type)
                    currentPlayerWarrior = player[playerIndex];
                    p(`You send to fight ${currentPlayerWarrior.type}.`)
                    await sleep(500)
                    nextPlayerWarrior(currentPlayerWarrior.type)
                    playerHP = [currentPlayerWarrior.amount * currentPlayerWarrior.hp, currentPlayerWarrior.amount * currentPlayerWarrior.hp];
                    updateUI(currentPlayerWarrior.type, playerHP[0], playerHP[1])
                    await sleep(500)
                }
            } 

            if (enemyIndex !== enemy.length - 1) {
                if (enemy[enemyIndex + 1].type === "bowWarrior") {
                    attackAnimation("enemybowWarrior")
                    playArrow()
                    
                    let enemyBowWarrior = enemy[enemyIndex + 1]
                    bonusDamageInformation = ""
                    damage = enemyBowWarrior.damage[generateRandomInteger(enemyBowWarrior.damage.length) - 1]
                    attack = enemyBowWarrior.amount * damage
                    console.log("HP GRACZA: ", playerHP[0] + " / " + playerHP[1]);
                    if (currentPlayerWarrior.type === "swordsWarrior") {
                        attack += damage
                        bonusDamageInformation = "Archers feel confident against knights. "
                    }
                    playerHP[0] -= attack
                    if (playerHP[0] < 0) playerHP[0] = 0
                    
                    console.log("HP GRACZA: ", playerHP[0] + " / " + playerHP[1]);
                    // HERE
                    warriorsKilled =  Math.floor((playerHP[1] - playerHP[0]) / currentPlayerWarrior.hp)
                    deadUnits[currentPlayerWarrior.type] = warriorsKilled
                    p(`${bonusDamageInformation ?? ""}Enemy back line archers deal ${attack} damage.`)
                    currentPlayerWarrior.amount = playerHP[1] / currentPlayerWarrior.hp - warriorsKilled
                     // HERE

                    updateUI(currentPlayerWarrior.type, enemyHP[0], enemyHP[1])
                    await sleep(1000)
                    if (bonusDamageInformation) await sleep(1000)
                }
            }

            if (playerHP[0] === 0) {
                playerIndex++;
                if (playerIndex === player.length) {
                    removeWarrior(currentPlayerWarrior.type)
                    return true
                } 
                else {
                    removeWarrior(currentPlayerWarrior.type)
                    currentPlayerWarrior = player[playerIndex];
                    p(`You send to fight ${currentPlayerWarrior.type}.`)
                    await sleep(500)
                    nextPlayerWarrior(currentPlayerWarrior.type)
                    playerHP = [currentPlayerWarrior.amount * currentPlayerWarrior.hp, currentPlayerWarrior.amount * currentPlayerWarrior.hp];
                    updateUI(currentPlayerWarrior.type, playerHP[0], playerHP[1])
                    await sleep(500)
                }
            } 

            attacker = "player"
        }
    }
}

function nextPlayerWarrior(warrior) {
    document.querySelector(`.${warrior}Container`).style.marginLeft = "auto";
}

function nextEnemyWarrior(warrior) {
    document.querySelector(`.${warrior}Container`).style.marginRight= "auto";
}

function removeWarrior(warrior) {
    document.querySelector(`.${warrior}Container`).style.display = "none";
}

function attackAnimation(warrior) {
    const warriorContainer = document.querySelector(`.${warrior}Container`)
    const image = warriorContainer.querySelector("img");
    if (warrior.includes("enemy")) image.style.animation = "enemyAttack 0.5s ease"
    else image.style.animation = "attack 0.5s ease"
    setTimeout(() => image.style.animation = "", 500)
}

function updateUI(warrior, currentHP, maxHP) {
    const warriorContainer = document.querySelector(`.${warrior}Container`)
    warriorContainer.querySelector("p").innerText = `${currentHP} hp`;
}