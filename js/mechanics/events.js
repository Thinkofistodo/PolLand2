const EventTypes = {
    default: 0,
    choice: 1,
    fight: 2
}

const ChoiceEventTypes = {
    resources: 0,
    nothing: 1,
    fight: 2
}

const events = {
    default: [{
            title: "Flooded Granary",
            text: "After yesterday's storm, a fungus has taken hold in one of our granaries. Water seeped in through the roof, damaging our precious food supplies. Much was salvaged, but unfortunately, a portion is no longer fit for even the animals.",
            resources: {
                food: -5
            }
        },
        {
            title: "Wolf Attack",
            text: "Last night, a pack of wolves infiltrated one of our granaries. Fortunately, there are no casualties among the people, but we've lost some food supplies.",
            resources: {
                food: -6
            }
        },
        {
            title: "Fruitful Waters",
            text: "The adjacent waters, swollen by recent heavy rains, have significantly nourished our lands. Consequently, the crops we're currently harvesting have flourished magnificently.",
            resources: {
                wheat: 4,
                cotton: 4,
            }
        }
    ],

    choice: [{
            type: "choice",
            title: "Idle Blacksmith",
            text: "One of our blacksmiths has informed us that he has some spare time and can forge a few extra items. Of course, nothing comes for free; we'll need to pay him for his work. Should we agree to his proposal?",
            option1: {
                type: ChoiceEventTypes.resources,
                resources: {
                    swords: 1,
                    iron_bar: 3,
                    coins: -8
                },
                buttonText: "Agree"
            },
            option2: {
                type: "nothing",
                buttonText: "Turn Down"
            }
        },
        {
            type: "choice",
            title: "Request for Festival Organization",
            text: "The villagers wish to organize a festival to take a break from their hard work. We must consider our food resources, but this could be a good opportunity to earn some money. A refusal wouldn't come as a surprise, but it's important to know that the morale of the working people will decrease, affecting their productivity.",
            option1: {
                type: ChoiceEventTypes.resources,
                resources: {
                    food: -10,
                    coins: 15
                },
                buttonText: "Agree"
            },
            option2: {
                type: ChoiceEventTypes.resources,
                resources: {
                    wood: -5,
                    stone: -5
                },
                buttonText: "Reject"
            },
        },
        {
            type: "choice",
            title: "Mill Requires Reconstruction",
            text: "One of our mills, as it turns out today, was built in an ill-conceived manner. If we don't make immediate substantial improvements, it might collapse tonight. If we have the resources for it, I suggest we start working on it right away.",
            option1: {
                type: ChoiceEventTypes.resources,
                resources: {
                    planks: -8,
                    wood: -8
                },
                buttonText: "Fix"
            },
            option2: {
                type: ChoiceEventTypes.resources,
                resources: {
                    flour: -5,
                    stone: -7,
                    wheat: -5
                },
                buttonText: "Ignore"
            },
        },
        {
            type: "choice",
            title: "Wandering Merchant",
            text: "A wandering merchant offers you some leather for sale. It may not be of luxurious quality, but it should suffice for crafting ropes. My Lord, would you like to accept his offer?",
            option1: {
                type: ChoiceEventTypes.resources,
                resources: {
                    leather: 4,
                    coins: -12
                },
                buttonText: "Accept"
            },
            option2: {
                type: "nothing",
                buttonText: "Decline"
            },
        },
        {
            type: "choice",
            title: "Wandering Merchant",
            text: "A nomadic trader is proposing to sell you some iron ore. While not the finest quality, it should be suitable for basic forging. My Lord, do you wish to consider his offer?",
            option1: {
                type: ChoiceEventTypes.resources,
                resources: {
                    iron_ore: 6,
                    coins: -12
                },
                buttonText: "Accept"
            },
            option2: {
                type: "nothing",
                buttonText: "Decline"
            },
        },
        {
            type: "choice",
            title: "Wandering Merchant",
            text: "A roving merchant is presenting you with an opportunity to purchase some string. It might not be the most delicate, but it could certainly serve for various practical purposes. My Lord, would you like to contemplate his proposal?",
            option1: {
                type: ChoiceEventTypes.resources,
                resources: {
                    string: 8,
                    coins: -16
                },
                buttonText: "Accept"
            },
            option2: {
                type: "nothing",
                buttonText: "Decline"
            },
        },
        {
            type: "choice",
            title: "Wandering Merchant",
            text: "A wandering merchant is suggesting that you acquire some coal from him. It could prove to be a valuable resource for our village. My Lord, are you interested in exploring this offer?",
            option1: {
                type: ChoiceEventTypes.resources,
                resources: {
                    string: 8,
                    coins: -16
                },
                buttonText: "Accept"
            },
            option2: {
                type: "nothing",
                buttonText: "Decline"
            },
        }
    ],
}
// enemy, winResources, loseResources,
function fightEvent() {
    const enemyConfiguration = generateRandomInteger(11)
    const enemyWarriors = []
    const winResources = {}
    const loseResources = {}
    let amount;
    switch (enemyConfiguration) {
        case 1:
            amount = generateRandomIntegerMinMax(4, 6)
            enemyWarriors.push({
                type: "bowWarrior",
                amount,
                damage: warriorsStatistics.bowWarrior.damage,
                hp: warriorsStatistics.bowWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 2)
            enemyWarriors.push({
                type: "axeWarrior",
                amount,
                damage: warriorsStatistics.axeWarrior.damage,
                hp: warriorsStatistics.axeWarrior.hp
            })
            break;
        case 2:
            enemyWarriors.push({
                type: "horseWarrior",
                amount: 1,
                damage: warriorsStatistics.horseWarrior.damage,
                hp: warriorsStatistics.horseWarrior.hp
            })
            amount = generateRandomIntegerMinMax(2, 4)
            enemyWarriors.push({
                type: "axeWarrior",
                amount,
                damage: warriorsStatistics.axeWarrior.damage,
                hp: warriorsStatistics.axeWarrior.hp
            })
            break;
        case 3:
            amount = generateRandomIntegerMinMax(3, 4)
            enemyWarriors.push({
                type: "swordsWarrior",
                amount,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            break;
        case 4:
            amount = generateRandomIntegerMinMax(1, 2)
            enemyWarriors.push({
                type: "bowWarrior",
                amount,
                damage: warriorsStatistics.bowWarrior.damage,
                hp: warriorsStatistics.bowWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 2)
            enemyWarriors.push({
                type: "swordsWarrior",
                amount,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            break;
        case 5:
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "axeWarrior",
                amount,
                damage: warriorsStatistics.axeWarrior.damage,
                hp: warriorsStatistics.axeWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "swordsWarrior",
                amount,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            break;
        case 6:
            amount = generateRandomIntegerMinMax(2, 3)
            enemyWarriors.push({
                type: "horseWarrior",
                amount,
                damage: warriorsStatistics.horseWarrior.damage,
                hp: warriorsStatistics.horseWarrior.hp
            })
            break;
        case 7:
            amount = generateRandomIntegerMinMax(1, 2)
            enemyWarriors.push({
                type: "bowWarrior",
                amount,
                damage: warriorsStatistics.bowWarrior.damage,
                hp: warriorsStatistics.bowWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 2)
            enemyWarriors.push({
                type: "swordsWarrior",
                amount,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 2)
            enemyWarriors.push({
                type: "axeWarrior",
                amount,
                damage: warriorsStatistics.axeWarrior.damage,
                hp: warriorsStatistics.axeWarrior.hp
            })
            break;
        case 8:
            enemyWarriors.push({
                type: "bowWarrior",
                amount: 2,
                damage: warriorsStatistics.bowWarrior.damage,
                hp: warriorsStatistics.bowWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "axeWarrior",
                amount,
                damage: warriorsStatistics.axeWarrior.damage,
                hp: warriorsStatistics.axeWarrior.hp
            })
            enemyWarriors.push({
                type: "horseWarrior",
                amount: 1,
                damage: warriorsStatistics.horseWarrior.damage,
                hp: warriorsStatistics.horseWarrior.hp
            })
            break;
        case 9:
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "swordsWarrior",
                amount,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "axeWarrior",
                amount,
                damage: warriorsStatistics.axeWarrior.damage,
                hp: warriorsStatistics.axeWarrior.hp
            })
            enemyWarriors.push({
                type: "horseWarrior",
                amount: 1,
                damage: warriorsStatistics.horseWarrior.damage,
                hp: warriorsStatistics.horseWarrior.hp
            })
            break;
        case 10:
            enemyWarriors.push({
                type: "swordsWarrior",
                amount: 2,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 4)
            enemyWarriors.push({
                type: "bowWarrior",
                amount,
                damage: warriorsStatistics.bowWarrior.damage,
                hp: warriorsStatistics.bowWarrior.hp
            })

            enemyWarriors.push({
                type: "horseWarrior",
                amount: 1,
                damage: warriorsStatistics.horseWarrior.damage,
                hp: warriorsStatistics.horseWarrior.hp
            })
            break;
        case 11:
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "swordsWarrior",
                amount,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "swordsWarrior",
                amount,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 3)
            enemyWarriors.push({
                type: "bowWarrior",
                amount,
                damage: warriorsStatistics.bowWarrior.damage,
                hp: warriorsStatistics.bowWarrior.hp
            })
            amount = generateRandomIntegerMinMax(1, 2)
            enemyWarriors.push({
                type: "horseWarrior",
                amount,
                damage: warriorsStatistics.horseWarrior.damage,
                hp: warriorsStatistics.horseWarrior.hp
            })
            break;
    }

    shuffleArray(enemyWarriors)

    const resourcesWin = ['coins', 'swords', 'bow', 'axe', 'food', 'leather', 'iron_bar'];
    const resourcesLose = ['coins', 'food', 'leather', "iron_ore", "rope", "flour", "coal", "planks", 'iron_bar'];
    const randomAmountOfWinResources = generateRandomInteger(3)
    const randomAmountOfLoseResources = generateRandomInteger(3)

    for (let i = 0; i < randomAmountOfWinResources; i++) {
        const randomIndex = generateRandomInteger(resourcesWin.length) - 1
        const resource = resourcesWin[randomIndex];
        let randomAmount;
        if (resource === "swords" || resource === "bow" || resource === "axe") randomAmount = generateRandomIntegerMinMax(1, 2);
        else randomAmount = generateRandomIntegerMinMax(3, 8);
        winResources[resource] = randomAmount
    }

    for (let i = 0; i < randomAmountOfLoseResources; i++) {
        const randomIndex = generateRandomInteger(resourcesLose.length) - 1
        const resource = resourcesLose[randomIndex];
        const randomAmount = generateRandomIntegerMinMax(3, 8);
        loseResources[resource] = -randomAmount
    }

    const fields = ["plains", "hills", "swamp", "ore_field", "rocks"]
    const randomField = generateRandomInteger(fields.length) - 1
    const callback = () => createFightDialog("bot", fields[randomField], enemyWarriors, winResources, loseResources, false)
    createTextDialog("The bandits are launching an attack on us", "A gang of marauders has decided to intrude on our lands. We cannot avoid confrontation; we must show them that these lands are not to be taken lightly.", false, callback);
}

function checkIfEvent() {
    if (generateRandomInteger(8) !== 8) return

    // jak będzie potrzeba rozbudowania to zamienić na getEventTypes()

    const eventType = generateRandomInteger(8);
    if (game.currentGoal > 1) {
        if (eventType < 3) fightEvent()
        if (eventType >= 3 && eventType <= 4) createChoiceEventDialog()
        if (eventType > 4) createDefaultEventDialog()
    } else eventType > 4 ? createDefaultEventDialog() : createChoiceEventDialog()
}

function getEventType() {
    // I know it seems like this function is useless, but later on I would like to manipulate the probability of the type of events
    // based on different parameters like current goal, season, day number etc. so it's easier to have dedicated function to do so
    const eventType = generateRandomInteger(3)
    if (eventType === 1) return EventTypes.default
    if (eventType === 2) return EventTypes.choice
    if (eventType === 3) return EventTypes.fight
}

function setStoryEvent() {
    if (game.currentGoal === 1 && game.turns === 15) {
        const callback = () => createFightDialog("player", "hills", [{
                type: "axeWarrior",
                amount: 1,
                damage: warriorsStatistics.axeWarrior.damage,
                hp: warriorsStatistics.axeWarrior.hp,
            },
            {
                type: "swordsWarrior",
                amount: 1,
                damage: warriorsStatistics.swordsWarrior.damage,
                hp: warriorsStatistics.swordsWarrior.hp,
            }
        ], {
            wood: 5,
            stone: 5
        }, {
            coins: -10,
            food: -10
        }, false)
        createTextDialog("A handful of bandits has attacked one of our fields.", "If we don't repel them now, they will see it as an invitation for more. I know we don't have many soldiers, but we must do everything in our power! Their numbers are not overwhelming, perhaps a stroke of luck will be on our side, and all will end well...", false, callback);
    }
}

let lastAttackedCamp;

function setBanditCamps() {

    const bandits = [
        document.querySelector("[data-building=bandit_camp1]"),
        document.querySelector("[data-building=bandit_camp2]"),
        document.querySelector("[data-building=bandit_camp3]")
    ]

    for (let i = 1; i <= 3; i++) {
  
        const openFightDialog = () => {
            const warriors = []
            for (const [warrior, amount] of Object.entries(game.bandits[`banditCamp${i}`])) {
                warriors.push(
                    {
                        type: warrior,
                        amount,
                        damage: warriorsStatistics[warrior].damage,
                        hp: warriorsStatistics[warrior].hp,
                    }
                )
            }
            createFightDialog("player", bandits[i - 1].dataset.field, warriors, {wood: 5}, {stone: 5}, true)
        }

        bandits[i - 1].addEventListener("click", () => {
            if (game.destroyedCamps.includes(i)) return
            playClick()
            createTextDialog("The Scout sent to the enemy camp has just returned.", "He brings back vital intelligence about the enemy's current state. Now, you have the option to either launch an immediate attack or withdraw and await a more favorable moment. The decision is yours, my Lord.", false, openFightDialog)
        })
        lastAttackedCamp = i
    }

}

