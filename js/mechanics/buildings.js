function buildingMechanic(field, building, isCenter, changeCosts = true) {
    //-47 -46 -45
    //-1   f   1
    //45  46  47

    let nearbyFieldsID = [-1, 1, 45, 46, 47, -45, -46, -47];
    const nearbyFieldsID2Layers = [-1, 1, 2, -2, 45, 46, 47, -45, -46, -47, 91, 92, 93, 94, 90, -90, -91, -92, -93, -94, -48, 48, -44, 44];
    const ID = Number(field.id);
    // repetead variables
    let amount, isOnSwamp, addWheat, addCotton, isStableAround, isTownCenterAround, isChurchAround, isMarketPlaceAround, isAnyBuildingAround, isCharcoalAround, isMillAround, isIronworksAround, countFishermansAround, isCottonFieldAround, isWaterAround, trade, wheat, resourcesList = [],
        countFarmlandsAround, countLumberjacksAround, countForestFieldsAround, wood, countMountainsAround, countSameTypeOfField, people, countMinesAround, countHousesAround;
    switch (building) {
        case "bandit_camp1":
        case "bandit_camp2":
        case "bandit_camp3":
            break;
        case "lumberjack":
            if (!isCenter && changeCosts) add("nextResources", "wood", -1 * Number(field.dataset.amount))

            amount = 2, countForestFieldsAround = 0, countLumberjacksAround = 0;
            for (const nearbyField of nearbyFieldsID) {
                if (fields[ID + nearbyField].dataset.field === "forest") countForestFieldsAround++;
                if (fields[ID + nearbyField].dataset.building === "lumberjack") countLumberjacksAround++;
            }

            amount = (amount + countForestFieldsAround / 2 - countLumberjacksAround)
            amount = amount - (amount % 1);
            if (amount < 0) amount = 0
            field.dataset.amount = amount
            if (changeCosts) add("nextResources", "wood", amount)

            if (isCenter && changeCosts) changeBuildingCost(building, "wood", 1, 1)
            break
        case "house":

            if (!isCenter && changeCosts) break
            amount = 5, countMinesAround = 0, countHousesAround = 0;
            isWaterAround = 0
            if (getSeason() === "winter") add("nextResources", "coal", -1);
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.field === "water") isWaterAround = 1;
                if (fields[ID + nearbyFieldID].dataset.building === "mine") countMinesAround++;
                if (fields[ID + nearbyFieldID].dataset.building === "house") countHousesAround++;
                if (fields[ID + nearbyFieldID].dataset.building === "well") isWaterAround = 1;
            }

            if (field.dataset.field === "rocks" || field.dataset.field === "ore_field") amount--
            if (field.dataset.field === "plain") amount++

            amount = amount - countMinesAround + countHousesAround + isWaterAround
            if (amount < 0) amount = 0
            field.dataset.amount = ++amount
            if (changeCosts) {
                add("nextResources", "food", -4)
                add("resources", "people", amount)
                add("resources", "unemployed", amount)
            }
            if (isCenter && changeCosts) changeBuildingCost(building, "planks", 2, 0)
            break
        case "border_tower":
            const updatedBorders = []
            //             -185  -184 -183
            //        -140 -139 -138 -137 -136
            //     -95 -94  -93 -92 -91  -90   -89
            //  -50 -49 -48  -47 -46 -45  -44  -43 -42 
            //  -4  -3  -2  -1 FIELD_ID  1  2   3   4
            //   42  43  44  45   46   47   48  49 50
            //     89   90   91  92  93   94  95
            //        136  137   138  139  140
            //             183  184  185
            const IDsofFieldsToUpdate = [88, 135, 182,186,141, 96, -88, -135, -182, -186, -141, -96, 42, 89, 136, 183, 184, 185, 140, 95, 50, 4, -42, -89, -136, -183, -184, -185, -140, -95, -50, -4, 1, 2, 3, 43, 44, 45, 46, 47, 48, 49, 90, 91, 92, 93, 94, 137, 138, 139, -1, -2, -3, -43, -44, -45, -46, -47, -48, -49, -90, -91, -92, -93, -94, -137, -138, -139];
            let fieldsToUpdateBorder = [88, 135, 182,186,141, 96, -88, -135, -182, -186, -141, -96, 42, 89, 136, 183, 184, 185, 140, 95, 50, 4, -42, -89, -136, -183, -184, -185, -140, -95, -50, -4, 1, 2, 3, 43, 44, 45, 46, 47, 48, 49, 90, 91, 92, 93, 94, 137, 138, 139, -1, -2, -3, -43, -44, -45, -46, -47, -48, -49, -90, -91, -92, -93, -94, -137, -138, -139];
            for (const IDofFieldToUpdate of IDsofFieldsToUpdate) {
                if (!fields[ID + IDofFieldToUpdate]) continue
                if (fields[ID + IDofFieldToUpdate].dataset.field === "mountains") {
                    switch (IDofFieldToUpdate) {
                        case 1:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![2, 3, -44, -43, 48, 49, 95, 50, 4, -42, -89, 96, -42, -88].includes(number))
                            break;
                        case 138:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![183, 184, 185].includes(number))
                            break;
                        case 2:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![3, 4, 50, -42, -43, 49].includes(number))
                            break;
                        case 3:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![4, 50, -42].includes(number))
                            break
                        case 47:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![94, 48, 49, 93, 139, 50, 95, 140, 185, 141, 186, 96].includes(number))
                            break;
                        case 49:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![50, 96].includes(number))
                            break;
                        case 46:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![92, 138, 137, 139, 93, 91, 140, 184, 183, 136, 185, 186, 182].includes(number))
                            break;
                        case 92:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![138, 137, 139, 183, 184, 185].includes(number))
                            break;
                        case 45:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![90, 91, 137, 44, 43, 183, 136, 89, 42, 135, 88, 182].includes(number))
                            break;
                        case 48:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![49, 50, 95, 96].includes(number))
                            break;
                        case 93:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![139, 140, 185, 186].includes(number))
                            break;
                        case 91:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![136, 137, 183, 182].includes(number))
                            break;
                        case 44:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![43, 42, 89, 88].includes(number))
                            break;
                        case 137:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![182, 183].includes(number))
                            break;
                        case 95:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 96 !== number)
                            break;
                        case 139:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![185, 186].includes(number))
                            break;
                        case 43:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![42, 88].includes(number))
                            break;
                        case 140:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 186 !== number)
                            break;
                        case 136:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 182 !== number)
                            break;
                        case 94:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![140, 95, 141].includes(number))
                            break;
                        case 89:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 44 !== number)
                            break;
                        case 8:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 88 !== number)
                            break;
                        case 90:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![136, 89, 135].includes(number))
                            break;

                        case -1:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![2, 3, -44, -43, 48, 49, 95, 50, 4, -42, -89, 96, -88].map(n => -n).includes(number))
                            break;
                        case -138:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![183, 184, 185].map(n => -n).includes(number))
                            break;
                        case -2:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![3, 4, 50, -42, -43, 49].map(n => -n).includes(number))
                            break;
                        case -3:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![4, 50, -42].map(n => -n).includes(number))
                            break
                        case -47:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![94, 48, 49, 93, 139, 50, 95, 140, 185, 141, 186, 96].map(n => -n).includes(number))
                            break;
                        case -49:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![50, 96].map(n => -n).includes(number))
                            break;
                        case -46:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![92, 138, 137, 139, 93, 91, 140, 184, 183, 136, 185, 186, 182].map(n => -n).includes(number))
                            break;
                        case -92:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![138, 137, 139, 183, 184, 185].map(n => -n).includes(number))
                            break;
                        case -45:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![90, 91, 137, 44, 43, 183, 136, 89, 42, 135, 88, 182].map(n => -n).includes(number))
                            break;
                        case -48:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![49, 50, 95, 96].map(n => -n).includes(number))
                            break;
                        case -93:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![139, 140, 185, 186].map(n => -n).includes(number))
                            break;
                        case -91:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![136, 137, 183, 182].map(n => -n).includes(number))
                            break;
                        case -44:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![43, 42, 89, 88].map(n => -n).includes(number))
                            break;
                        case -137:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![182, 183].map(n => -n).includes(number))
                            break;
                        case -95:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 96 !== number)
                            break;
                        case -139:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![185, 186].map(n => -n).includes(number))
                            break;
                        case -43:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![42, 88].map(n => -n).includes(number))
                            break;
                        case -140:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 186 !== number)
                            break;
                        case -136:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 182 !== number)
                            break;
                        case -94:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![140, 95, 141].map(n => -n).includes(number))
                            break;
                        case -89:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 44 !== number)
                            break;
                        case -8:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => 88 !== number)
                            break;
                        case -90:
                            fieldsToUpdateBorder = fieldsToUpdateBorder.filter(number => ![136, 89, 135].map(n => -n).includes(number))
                            break;



                    }
                }
            }

            for (const fieldToUpdateBorder of fieldsToUpdateBorder) {
                if (!fields[ID + fieldToUpdateBorder]) continue
                if (fields[ID + fieldToUpdateBorder] < 0 || fields[ID + fieldToUpdateBorder] > rows * columns) continue;
                if (fields[ID + fieldToUpdateBorder].dataset.border === "false") {
                    fields[ID + fieldToUpdateBorder].dataset.border = "true";
                    updatedBorders.push(ID + fieldToUpdateBorder);
                }
            }

            game.lastUpdatedBorders = updatedBorders

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "wood", 2, 0)
                changeBuildingCost(building, "planks", 2, 1)
                game.cannotUndo = "bordertower" 
            }
            
            break
        case "sawmill":
            if (!isCenter && changeCosts) removeAmounts(field, "sawmill")

            amount = 3, trade = "11", countLumberjacksAround = 0, countForestFieldsAround = 0;
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "lumberjack") countLumberjacksAround++;
                if (fields[ID + nearbyFieldID].dataset.field === "forest") countForestFieldsAround++;
            }

            if (countLumberjacksAround > 2) countLumberjacksAround = 2
            if (countLumberjacksAround > 0 && countForestFieldsAround > 0) trade = "12"
            if (field.dataset.field === "hills") amount--
            if (countLumberjacksAround > 0) amount++
            if (field.dataset.field === "swamp") amount -= 2
            amount += countLumberjacksAround

            field.dataset.amount = amount
            field.dataset.trade = trade

            checkAmountAndCurrentAmount(building, trade, amount, {
                planks: {
                    input: ["wood"]
                }
            })

            if (isCenter && changeCosts) changeBuildingCost(building, "wood", 1, 1)
            
            break
        case "mine":
            const whatIsBeingMined = field.dataset.metal

            if (!isCenter && changeCosts) {
                add("nextResources", whatIsBeingMined, -1 * Number(field.dataset.amount))
                if (whatIsBeingMined !== "stone") add("nextResources", "stone", -1)
            }

            const typeOfField = field.dataset.field
            countMountainsAround = 0, countSameTypeOfField = 0, countMinesAround = 0;
            let isNone = false;
            switch (typeOfField) {
                case "swamp":
                    isNone = true
                    break
                case "ore_field":
                    amount = 2;
                    break
                case "rocks":
                    amount = 3;
                    break
                default:
                    amount = 1;
                    break;
            }

            for (const nearbyField of nearbyFieldsID) {
                if (fields[ID + nearbyField].dataset.field === typeOfField &&
                    fields[ID + nearbyField].dataset.metal === whatIsBeingMined)
                    countSameTypeOfField++;
                if (fields[ID + nearbyField].dataset.field === "mountains") countMountainsAround++;
                if (fields[ID + nearbyField].dataset.building === "mine") countMinesAround = 1;
            }
            if (countSameTypeOfField > 2) countSameTypeOfField = 2
            amount += countMountainsAround + countMinesAround + countSameTypeOfField
            if (whatIsBeingMined === "coal") amount++
            if (isNone) amount = 0

            field.dataset.amount = amount
            if (whatIsBeingMined !== "none" && changeCosts) {
                if (whatIsBeingMined !== "stone") add("nextResources", "stone", 1)
                add("nextResources", whatIsBeingMined, amount)
            }

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "planks", 2, 1)
                changeBuildingCost(building, "stone", 2, 2)
            }
            break
        case "well":

            if (!isCenter && changeCosts)
                for (const IDofFieldToUpdate of nearbyFieldsID2Layers) fields[ID + IDofFieldToUpdate].dataset.waterAccess = false
            for (const IDofFieldToUpdate of nearbyFieldsID2Layers) fields[ID + IDofFieldToUpdate].dataset.waterAccess = true
            if (isCenter && changeCosts) {
                changeBuildingCost(building, "wood", 1, 1)
                changeBuildingCost(building, "planks", 1, 2)
                changeBuildingCost(building, "stone", 1, 3)
            }

            break;
        case "worker":
            if (isCenter && changeCosts) {
                add("resources", "workers", 1)
                add("maxResources", "workers", 1)
                changeBuildingCost(building, "hammer", 1, 0)
                changeBuildingCost(building, "wood", 3, 1)
                changeBuildingCost(building, "planks", 3, 2)
                changeBuildingCost(building, "stone", 3, 3)
            }
            break;
        case "warehouse":
            if (!isCenter && changeCosts) {
                resourcesList = JSON.parse(field.dataset.resourcesList)
                for (const [singleResource, amount] of resourcesList) {

                    add("maxResources", singleResource, -1 * amount)
                }
                resourcesList = []
                field.dataset.resourcesList = "[]"
            }

            for (const nearbyFieldID of nearbyFieldsID) {
                switch (fields[ID + nearbyFieldID].dataset.building) {
                    case "hunters_hut":
                        resourcesList.push(["leather", 4])
                        break;
                    case "lumberjack":
                        resourcesList.push(["wood", 5])
                        break;
                    case "sawmill":
                        resourcesList.push(["planks", 8])
                        break;
                    case "mine":
                        if (fields[ID + nearbyFieldID].dataset.metal === "iron_ore") resourcesList.push(["iron_ore", 5])
                        if (fields[ID + nearbyFieldID].dataset.metal === "coal") resourcesList.push(["coal", 5])
                        resourcesList.push(["stone", 9])
                        break;
                    case "ironworks":
                        resourcesList.push(["iron_bar", 5])
                        break;
                    case "charcoal":
                        resourcesList.push(["coal", 8])
                        break;
                    case "rope_maker":
                        resourcesList.push(["rope", 3])
                        resourcesList.push(["string", 3])
                        break;
                    case "geologist":
                        if (fields[ID + nearbyFieldID].dataset.metal === "none") break;
                        if (fields[ID + nearbyFieldID].dataset.metal === "iron_ore") resourcesList.push(["iron_ore", 5])
                        if (fields[ID + nearbyFieldID].dataset.metal === "coal") resourcesList.push(["coal", 5])
                        if (fields[ID + nearbyFieldID].dataset.metal === "stone") resourcesList.push(["stone", 5])
                        break;
                }
            }

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "rope", 1, 0)
                changeBuildingCost(building, "stone", 1, 3)
                changeBuildingCost(building, "wood", 1, 1)
                changeBuildingCost(building, "planks", 1, 2)
            }
            if (changeCosts)
                for (const [singleResource, amount] of resourcesList) add("maxResources", singleResource, amount)
            field.dataset.resourcesList = JSON.stringify(resourcesList)

            break;
        case "farmland":
            if (!isCenter && changeCosts) add("nextResources", "wheat", -1 * Number(field.dataset.amount))
            countFarmlandsAround = 0, isOnSwamp = 0, isWaterAround = 0, isCottonFieldAround = 0
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "farmland") countFarmlandsAround++;
                if (fields[ID + nearbyFieldID].dataset.building === "cotton_field") isCottonFieldAround = 1
                if (fields[ID + nearbyFieldID].dataset.field === "water") {
                    field.dataset.waterAccess = "true"
                    isWaterAround = 1
                }
            }
            if (field.dataset.field === "swamp") isOnSwamp = 1

            if (!isWaterAround && field.dataset.waterAccess !== "true") field.dataset.waterAccess = "false"
            if (field.dataset.waterAccess === "true") isWaterAround = 1;

            amount = ((countFarmlandsAround - countFarmlandsAround % 2) / 2) + 1
            if (amount > 2) amount = 2
            amount = amount + isOnSwamp + isCottonFieldAround
            if (getSeason() === "summer") amount++
            if (isWaterAround !== 1) amount = 0
            
            if (changeCosts) add("nextResources", "wheat", amount)
            field.dataset.amount = amount


            if (isCenter && changeCosts) changeBuildingCost(building, "planks", 1, 0)
            break
        case "fisherman":
            if (!isCenter && changeCosts) add("nextResources", "food", -1 * Number(field.dataset.amount))

            isWaterAround = 0, countFishermansAround = 0, isOnSwamp = 0, countWaterLandAround = 0
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.field === "water") isWaterAround += 1
                if (fields[ID + nearbyFieldID].dataset.building === "fisherman") countFishermansAround++
            }
            if (field.dataset.field === "swamp") isOnSwamp = 1
            amount = 3 - countFishermansAround * 2 + isOnSwamp;
            if (isWaterAround >= 3) amount++;
            if (isWaterAround === 0 || amount < 0) amount = 0;
            if (!isWaterAround) field.dataset.isFish = false
            field.dataset.amount = amount
            if (changeCosts) add("nextResources", "food", amount)
            if (getSeason() === "winter" && changeCosts) add("nextResources", "food", -1 * amount)

            if (isCenter && changeCosts) changeBuildingCost(building, "wood", 2, 1)
            break;
        case "mill":

            if (!isCenter && changeCosts) removeAmounts(field, building)

            amount = 3, trade = "41", countFarmlandsAround = 0, isWaterAround = 0, isMillAround = 0;
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "farmland") countFarmlandsAround++;
                if (fields[ID + nearbyFieldID].dataset.building === "mill") isMillAround = 1;
                if (fields[ID + nearbyFieldID].dataset.field === "water") {
                    field.dataset.waterAccess = "true"
                    isWaterAround = 1
                }
            }
            if (!isWaterAround && field.dataset.waterAccess !== "true") field.dataset.waterAccess = "false"
            if (field.dataset.waterAccess === "true") isWaterAround = 1;

            amount += countFarmlandsAround
            if (isWaterAround || isMillAround) trade = "31"
            if (isWaterAround && isMillAround) trade = "21"
            if (field.dataset.field === "swamp") amount--

            if (amount > 6) amount = 5

            field.dataset.amount = amount
            field.dataset.trade = trade

            checkAmountAndCurrentAmount(building, trade, amount, {
                flour: {
                    input: ["wheat"]
                }
            })

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "wood", 2, 0)
                changeBuildingCost(building, "stone", 3, 1)
            }

            ;
            break
        case "cotton_field":
            if (!isCenter && changeCosts) add("nextResources", "cotton", -1 * Number(field.dataset.amount))

            countFarmlandsAround = 0, isOnSwamp = 0, isWaterAround = 0
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "farmland") countFarmlandsAround = 1;
                if (fields[ID + nearbyFieldID].dataset.field === "water") isWaterAround = 1
            }

            if (field.dataset.field === "swamp") isOnSwamp = 1
            if (field.dataset.waterAccess === "true") isWaterAround = 1;


            amount = countFarmlandsAround
            if (amount > 2) amount = 2
            if (isOnSwamp === 1) amount += 1
            isWaterAround === 0 ? amount = 0 : amount++;
            if (changeCosts) add("nextResources", "cotton", amount)
            field.dataset.amount = amount


            if (isCenter && changeCosts) changeBuildingCost(building, "wood", 2, 0)
            break
        case "granary":
            if (!isCenter && changeCosts) {
                add("maxResources", "wheat", -15)
                add("maxResources", "food", -10)
                add("maxResources", "flour", -15)
            }


            if (changeCosts) {
                add("maxResources", "wheat", 15)
                add("maxResources", "flour", 10)
                add("maxResources", "food", 15)
            }

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "planks", 5, 0)
                changeBuildingCost(building, "stone", 5, 1)
                changeBuildingCost(building, "iron_bar", 1, 2)
                changeBuildingCost(building, "wheat", 5, 3)
            }
            break;
        case "hunters_hut":
            if (!isCenter && changeCosts) {
                add("nextResources", "leather", -1 * Number(field.dataset.amount2))
                add("nextResources", "food", -1 * Number(field.dataset.amount3))
            }

            amount = 1, trade = "19", countForestFieldsAround = 0, isWaterAround = 0, isAnyBuildingAround = 0
            for (const nearbyField of nearbyFieldsID) {
                if (fields[ID + nearbyField].dataset.field === "forest") countForestFieldsAround = 1;
                if (fields[ID + nearbyField].dataset.field === "water") isWaterAround = 1;
                if (fields[ID + nearbyField].dataset.building !== "none") isAnyBuildingAround = 1;
            }

            let meat = 1,
                leather = 1;

            if (countForestFieldsAround !== 0) {
                if (countForestFieldsAround >= 4) {
                    meat += 2
                    leather++
                }
                meat++;
                leather += isWaterAround
            } else leather = 0;


            if (field.dataset.field === "rocks" || field.dataset.field === "ore_field") {
                leather = 0;
                if (countForestFieldsAround !== 0) meat = 0;
            }

            if (field.dataset.field === "swamp") {
                leather = 0;
                meat = 0;
            }

            if (isAnyBuildingAround === 1) {
                if (!meat) meat = 1;
                if (!leather) leather = 1;
            }

            if (changeCosts) {
                add("nextResources", "leather", leather)
                add("nextResources", "food", meat)
            }

            field.dataset.amount2 = leather
            field.dataset.amount3 = meat

            field.dataset.amount = amount
            field.dataset.trade = trade

            if (isCenter && changeCosts) {
                checkAmountAndCurrentAmount(building, trade, amount, {
                    food: {
                        input: ["horse"]
                    }
                })
                changeBuildingCost(building, "planks", 2, 1)
            }

            break;
        case "charcoal":
            if (!isCenter && changeCosts) {
                removeAmounts(field, building)
            }

            amount = 2, trade = "11", countLumberjacksAround = 0, isForestAround = 0;
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "lumberjack") countLumberjacksAround++;
                if (fields[ID + nearbyFieldID].dataset.field === "forest") isForestAround = 1;
            }

            if (countLumberjacksAround > 3) countLumberjacksAround = 3
            if (countLumberjacksAround > 0) {
                trade = `1${countLumberjacksAround}`
                if (isForestAround === 1) amount = 4
            }

            if (field.dataset.field === "swamp") {
                trade = "11"
                amount = 1
            }

            field.dataset.amount = amount
            field.dataset.trade = trade

            checkAmountAndCurrentAmount("charcoal", trade, amount, {
                coal: {
                    input: ["wood"]
                }
            })

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "wood", 1, 0)
                changeBuildingCost(building, "stone", 1, 1)
            }

            ;
            break;
        case "bakery":
            if (!isCenter && changeCosts) {
                removeAmounts(field, building);
            }
            // using lumberjacks variable but counting bakeries, dont want to make another one
            amount = 4, trade = "11", isWaterAround = 0, isMillAround = 0, countLumberjacksAround = 0;
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "mill") isMillAround = 1;
                if (fields[ID + nearbyFieldID].dataset.building === "bakery") countLumberjacksAround = 1
                if (fields[ID + nearbyFieldID].dataset.field === "water") {
                    field.dataset.waterAccess = "true"
                    isWaterAround = 1
                }
            }

            if (!isWaterAround && field.dataset.waterAccess !== "true") field.dataset.waterAccess = "false"
            if (field.dataset.waterAccess === "true") isWaterAround = 1;
            if (countLumberjacksAround === 1) amount += 2;

            if (isMillAround) trade = "12"
            if (field.dataset.field === "swamp") amount -= 2
            if (isWaterAround === 0) amount = 0


            field.dataset.amount = amount
            field.dataset.trade = trade

            checkAmountAndCurrentAmount("bakery", trade, amount, {
                food: {
                    input: ["flour"]
                }
            })

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "planks", 2, 1)
                changeBuildingCost(building, "stone", 2, 2)
            }

            ;

            break;
        case "rope_maker":
            if (!isCenter && changeCosts) {
                removeAmounts(field, building)
            }

            // lumberjacks are cotton fields
            amount = 1, trade = "321", isWaterAround = 0, countLumberjacksAround = 0
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "cotton_field") countLumberjacksAround = 1;
                if (fields[ID + nearbyFieldID].dataset.field === "water") {
                    field.dataset.waterAccess = "true"
                    isWaterAround = 1
                }
            }

            if (!isWaterAround && field.dataset.waterAccess !== "true") field.dataset.waterAccess = "false"
            if (field.dataset.waterAccess === "true") isWaterAround = 1;

            if (countLumberjacksAround === 1) amount++;
         
            if (field.dataset.field === "swamp") amount++
            if (isWaterAround === 0) amount = 0


            field.dataset.amount = amount
            field.dataset.trade = trade

            checkAmountAndCurrentAmount("rope_maker", trade, amount, {
                string: {
                    input: ["cotton", "cotton"]
                },
                rope: {
                    input: ["cotton", "leather"]
                },
                fishing_rod: {
                    input: ["wood", "string"]
                },
                bow: {
                    input: ["string", "wood"]
                }
            })

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "leather", 1, 0)
                changeBuildingCost(building, "wood", 1, 1)
                changeBuildingCost(building, "planks", 1, 2)
            }

            ;
            break;
        case "geologist":
            if (isCenter && field.dataset.metal !== "coal" && field.dataset.metal !== "coins" && field.dataset.metal !== "iron_ore" && changeCosts) {
                let randomNumber = generateRandomInteger(4);
                let metal;
                if (randomNumber === 1) metal = "iron_ore"
                else if (randomNumber === 2) metal = "coal"
                else if (randomNumber === 3) metal = "coal"
                else if (randomNumber === 4) metal = "coins"
                game.cannotUndo = "geologist"
                field.dataset.metal = metal
            }
                
            if (isCenter && changeCosts) changeBuildingCost(building, "coins", 2, 0)
            break;
        case "ironworks":
            if (!isCenter && changeCosts) removeAmounts(field, building)

            amount = 2, trade = "131", isIronworksAround = 0, isWaterAround = 0
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "ironworks") isIronworksAround++;
                if (fields[ID + nearbyFieldID].dataset.field === "water") {
                    field.dataset.waterAccess = "true"
                    isWaterAround = 1
                }
            }

            if (!isWaterAround && field.dataset.waterAccess !== "true") field.dataset.waterAccess = "false"
            if (field.dataset.waterAccess === "true") isWaterAround = 1;

            if (field.dataset.metal === "coal" || isIronworksAround > 2) trade = "121";
            if (!isWaterAround) amount = 0;

            field.dataset.amount = amount
            field.dataset.trade = trade

            checkAmountAndCurrentAmount(building, trade, amount, {
                iron_bar: {
                    input: ["coal", "iron_ore"]
                },
                hammer: {
                    input: ["iron_bar", "coal"]
                }
            })

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "wood", 1, 0)
                changeBuildingCost(building, "planks", 1, 1)
                changeBuildingCost(building, "stone", 2, 2)
            }

            ;
            break;
        case "smithy":
            if (!isCenter && changeCosts) removeAmounts(field, building);
            amount = 1, trade = "3111", isCharcoalAround = 1, isIronworksAround = 1, isWaterAround = 0
            for (const nearbyFieldID of nearbyFieldsID) {
                if (fields[ID + nearbyFieldID].dataset.building === "charcoal") isCharcoalAround = 1;
                if (fields[ID + nearbyFieldID].dataset.building === "ironworks") isIronworksAround = 1;
                if (fields[ID + nearbyFieldID].dataset.field === "water") {
                    field.dataset.waterAccess = "true"
                    isWaterAround = 1
                }
            }

            if (!isWaterAround && field.dataset.waterAccess !== "true") field.dataset.waterAccess = "false"
            if (field.dataset.waterAccess === "true") isWaterAround = 1;

            if (isCharcoalAround || isIronworksAround || field.dataset.metal === "coal") trade = "2111";
            
            if (!isWaterAround) amount = 0;

            field.dataset.amount = amount
            field.dataset.trade = trade
            checkAmountAndCurrentAmount(building, trade, amount, {
                axe: {
                    input: ["coal", "planks", "iron_bar"],
                },
                pickaxe: {
                    input: ["coal", "planks", "iron_bar"],
                },
                saw: {
                    input: ["coal", "planks", "iron_bar"],
                },
                swords: {
                    input: ["coal", "iron_bar", "iron_bar"],
                },
            })

            if (isCenter && changeCosts) {
                changeBuildingCost(building, "hammer", 1, 0)
                changeBuildingCost(building, "wood", 2, 1)
                changeBuildingCost(building, "planks", 2, 2)
                changeBuildingCost(building, "stone", 2, 3)
            }

            break;
        case "armory":

            if (!isCenter && changeCosts) {
                resourcesList = JSON.parse(field.dataset.resourcesList)
                for (const [singleResource, amount] of resourcesList) {
                    add("maxResources", singleResource, -1 * amount)
                }
                resourcesList = []
                field.dataset.resourcesList = "[]"
            }


            for (const nearbyFieldID of nearbyFieldsID) {
                switch (fields[ID + nearbyFieldID].dataset.building) {
                    case "hunters_hut":
                        resourcesList.push(["bow", 2])
                        break;
                    case "barracks":
                        resourcesList.push(["swords", 3])
                        resourcesList.push(["axe", 3])
                        break;
                    case "smithy":
                        resourcesList.push(["axe", 1])
                        resourcesList.push(["pickaxe", 1])
                        resourcesList.push(["hammer", 1])
                        resourcesList.push(["saw", 1])
                        resourcesList.push(["swords", 1])
                        break;
                    case "fisherman":
                        resourcesList.push(["fishing_rod", 2])
                        break;
                    case "worker":
                        resourcesList.push(["hammer", 3])
                        break;
                    case "rope_maker":
                        resourcesList.push(["rope", 3])
                        resourcesList.push(["string", 3])
                        break;
                    case "lumberjack":
                        resourcesList.push(["axe", 1])
                        break;
                    case "sawmill":
                        resourcesList.push(["saw", 2])
                        break;
                    case "mine":
                        resourcesList.push(["pickaxe", 1])
                        break;
                }
            }



            if (isCenter && changeCosts) {
                changeBuildingCost(building, "wood", 4, 0)
                changeBuildingCost(building, "planks", 4, 1)
                changeBuildingCost(building, "stone", 4, 2)
                changeBuildingCost(building, "leather", 4, 3)
            }

            for (const [singleResource, amount] of resourcesList) add("maxResources", singleResource, amount)
            field.dataset.resourcesList = JSON.stringify(resourcesList)

            break;
        case "church":
            if (!isCenter && changeCosts) add("nextResources", "coins", -1 * Number(field.dataset.amount))
            

            amount = 0, countHousesAround = 0, isTownCenterAround = 0, isMarketPlaceAround = 0, isChurchAround = 0;
            for (const nearbyField of nearbyFieldsID) {
                if (fields[ID + nearbyField].dataset.building === "house") countHousesAround++;
                if (fields[ID + nearbyField].dataset.building === "towncenter") isTownCenterAround = 1;
                if (fields[ID + nearbyField].dataset.building === "marketplace") isMarketPlaceAround = 1;
                if (fields[ID + nearbyField].dataset.building === "church") isChurchAround = 1;
            }

            if (isTownCenterAround) amount += 2
            if (isMarketPlaceAround) amount += 1
            amount += Math.floor(countHousesAround / 2 + 1)
            if (isChurchAround) amount = Math.floor(amount / 2)
            if (amount < 0) amount = 1

            field.dataset.amount = amount

            if (changeCosts) add("nextResources", "coins", amount)
            if (isCenter && changeCosts) {
                changeBuildingCost(building, "coins", 5, 0)
                changeBuildingCost(building, "stone", 3, 1)
            }
            break
        case "stable":


            amount = 1, trade = "771", horseAmount = 3, isStableAround = 0, countFarmlandsAround = 0
            for (const nearbyField of nearbyFieldsID) {
                if (fields[ID + nearbyField].dataset.building === "stable") isStableAround++;
                if (fields[ID + nearbyField].dataset.field === "wheat") countFarmlandsAround++;
            }

            if (isStableAround) horseAmount++
            if (countFarmlandsAround > 0) trade = "661"
            if (countFarmlandsAround > 2) trade = "551"
            if (field.dataset.field === "rocks" || field.dataset.field === "ore_field" || field.dataset.field === "swamp") horseAmount = 1;

            if (changeCosts) add("maxResources", "horse", horseAmount)
            if (!isCenter && changeCosts) add("maxResources", "horse", -1 * Number(field.dataset.amount2))

            field.dataset.amount2 = horseAmount
            field.dataset.amount = amount
            field.dataset.trade = trade

            if (isCenter && changeCosts) {
                checkAmountAndCurrentAmount(building, trade, amount, {
                    horse: {
                        input: ["coins", "coins"]
                    }
                })
                changeBuildingCost(building, "wood", 3, 0)
            }


            break
        case "marketplace":
            if (isCenter && changeCosts) {
                game.marketplaces++;
                addNewRandomTrade();
                changeBuildingCost(building, "rope", 1, 0)
                changeBuildingCost(building, "wood", 2, 1)
                changeBuildingCost(building, "planks", 1, 2)
            }

            break;
        case "barracks":
            if (isCenter && changeCosts) {
                game.maxArmy += 5;
                changeBuildingCost(building, "wood", 2, 0)
                changeBuildingCost(building, "planks", 2, 1)
                changeBuildingCost(building, "stone", 2, 2)
            }
            break;
        case "towncenter":
            break;
    }


    if (isCenter && changeCosts) {
        if (building === "well") nearbyFieldsID = nearbyFieldsID2Layers
        for (const nearbyFieldID of nearbyFieldsID) {
            if (fields[ID + nearbyFieldID].dataset.building === "none") continue
            buildingMechanic(fields[ID + nearbyFieldID], fields[ID + nearbyFieldID].dataset.building, false)
        }
    }

}



function cancelBuildingMechanic(field, building) {
    game.lastFieldBuildedOn = "none"
    const fieldsAround = [-1, 1, 45, 46, 47, -45, -46, -47];
    const nearbyFieldsID2Layers = [-1, 1, 2, -2, 45, 46, 47, -45, -46, -47, 91, 92, 93, 94, 90, -90, -91, -92, -93, -94, -48, 48, -44, 44];
    const index = Number(field.id);
    field.removeAttribute("data-listener");
    let resourcesList;
    switch (building) {
        case "lumberjack":
            add("nextResources", "wood", -1 * Number(field.dataset.amount))
            changeBuildingCost(building, "wood", -1, 1)
            break
        case "house":
            const people = field.dataset.amount
            if (getSeason() === "winter") add("nextResources", "coal", -2);
            add("nextResources", "food", 4)
            add("resources", "people", -1 * people)
            add("resources", "unemployed", -1 * people)
            changeBuildingCost(building, "planks", -2, 0)
            break
        case "border_tower":
            if (game.lastBuildedBuilding === "border_tower")
                for (const field of game.lastUpdatedBorders) fields[field].dataset.border = "false";
            changeBuildingCost(building, "wood", -2, 0)
            changeBuildingCost(building, "planks", -2, 1)
            break;
        case "sawmill":
            removeAmounts(field, building)
            changeBuildingCost(building, "wood", -1, 1)
            break;
        case "mine":
            if (field.dataset.metal !== "none") add("nextResources", field.dataset.metal, -1 * Number(field.dataset.amount))
            if (field.dataset.metal !== "stone") add("nextResources", "stone", -1)
            changeBuildingCost(building, "planks", -2, 1)
            changeBuildingCost(building, "stone", -2, 2)
            break
        case "well":
            field.dataset.Access = false
            for (const IDofFieldToUpdate of nearbyFieldsID2Layers) fields[index + IDofFieldToUpdate].dataset.waterAccess = false
            changeBuildingCost(building, "wood", -1, 1)
            changeBuildingCost(building, "planks", -1, 2)
            changeBuildingCost(building, "stone", -1, 3)
            break;
        case "worker":
            add("resources", "workers", -1)
            add("maxResources", "workers", -1)
            changeBuildingCost(building, "hammer", -1, 0)
            changeBuildingCost(building, "wood", -3, 1)
            changeBuildingCost(building, "planks", -3, 2)
            changeBuildingCost(building, "stone", -3, 3)
            break;
        case "warehouse":
            resourcesList = JSON.parse(field.dataset.resourcesList)
            for (const [singleResource, amount] of resourcesList) add("maxResources", singleResource, -1 * amount)
            field.dataset.resourcesList = "[]"
            changeBuildingCost(building, "stone", -1, 3)
            changeBuildingCost(building, "rope", -1, 0)
            changeBuildingCost(building, "wood", -1, 1)
            changeBuildingCost(building, "planks", -1, 2)
            break
        case "farmland":
            add("nextResources", "wheat", -1 * Number(field.dataset.amount))
            changeBuildingCost(building, "planks", -1, 0)
            break;
        case "fisherman":
            add("nextResources", "food", -1 * Number(field.dataset.amount))
            if (getSeason() === "winter") add("nextResources", "food", Number(field.dataset.amount))
            changeBuildingCost(building, "wood", -2, 1)
            break;
        case "mill":
            removeAmounts(field, building)
            changeBuildingCost(building, "wood", -2, 0)
            changeBuildingCost(building, "stone", -3, 1)
            break;
        case "cotton_field":
            add("nextResources", "cotton", -1 * Number(field.dataset.amount))
            changeBuildingCost(building, "wood", -2, 0)
            break;
        case "granary":
            add("maxResources", "wheat", -15)
            add("maxResources", "food", -15)
            add("maxResources", "flour", -10)
            changeBuildingCost(building, "planks", -5, 0)
            changeBuildingCost(building, "stone", -5, 1)
            changeBuildingCost(building, "iron_bar", -1, 2)
            changeBuildingCost(building, "wheat", -5, 3)
            break;
        case "hunters_hut":
            add("nextResources", "leather", -1 * Number(field.dataset.amount2))
            add("nextResources", "food", -1 * Number(field.dataset.amount3))
            changeBuildingCost(building, "planks", -2, 1)
            field.dataset.amount2 = 0
            field.dataset.amount3 = 0
            break;
        case "charcoal":
            removeAmounts(field, building)
            changeBuildingCost(building, "wood", -1, 0)
            changeBuildingCost(building, "stone", -1, 1)
            break;
        case "geologist":
            break;
        case "bakery":
            removeAmounts(field, building)
            changeBuildingCost(building, "planks", -2, 1)
            changeBuildingCost(building, "stone", -2, 2)
            break;
        case "rope_maker":
            removeAmounts(field, building)
            changeBuildingCost(building, "leather", -1, 0)
            changeBuildingCost(building, "wood", -1, 1)
            changeBuildingCost(building, "planks", -1, 2)
            break;
        case "ironworks":
            removeAmounts(field, building);
            changeBuildingCost(building, "wood", -1, 0)
            changeBuildingCost(building, "planks", -1, 1)
            changeBuildingCost(building, "stone", -2, 2)
            break;
        case "smithy":
            removeAmounts(field, building)
            changeBuildingCost(building, "hammer", -1, 0)
            changeBuildingCost(building, "wood", -2, 1)
            changeBuildingCost(building, "planks", -2, 2)
            changeBuildingCost(building, "stone", -2, 3)
            break;
        case "armory":
            resourcesList = JSON.parse(field.dataset.resourcesList)
            for (const [singleResource, amount] of resourcesList) add("maxResources", singleResource, -1 * amount)
            field.dataset.resourcesList = "[]"
            changeBuildingCost(building, "wood", -4, 0)
            changeBuildingCost(building, "planks", -4, 1)
            changeBuildingCost(building, "stone", -4, 2)
            changeBuildingCost(building, "leather", -4, 3)
            break
        case "church":
            add("nextResources", "coins", -1 * Number(field.dataset.amount))
            changeBuildingCost(building, "coins", -5, 0)
            changeBuildingCost(building, "stone", -3, 1)
            break;
        case "stable":
            add("maxResources", "horse", -1 * Number(field.dataset.amount1))
            changeBuildingCost(building, "wood", -3, 0)
            field.dataset.amount2 = 0;
            break;
        case "marketplace":
            game.trades.pop();
            game.marketplaces--;
            if (isCenter && changeCosts) {
                changeBuildingCost(building, "rope", -1, 0)
                changeBuildingCost(building, "wood", -2, 1)
                changeBuildingCost(building, "planks", -1, 2)
            }
            break;
        case "barracks":
            game.maxArmy -= 5;
            changeBuildingCost(building, "wood", -2, 0)
            changeBuildingCost(building, "planks", -2, 1)
            changeBuildingCost(building, "stone", -2, 2)
            break;
        case "towncenter":
            break;
    }

    field.dataset.amount = 0
    field.dataset.trade = ""

    for (const nearbyFieldID of fieldsAround) {
        if (fields[index + nearbyFieldID].dataset.building === "none") continue
        buildingMechanic(fields[index + nearbyFieldID], fields[index + nearbyFieldID].dataset.building, false)
    }
}

function changeBuildingCost(building, resource, amount, index) {
    document.querySelector(`#${building}_${resource}`).innerText = game.buildingsCosts[`${building}`][index][0] += amount
}

function isThisField(field, name) {
    return field.dataset.field === name;
}

function checkAmountAndCurrentAmount(building, trade, amount, outputObject) {
    game.production[building] = game.production[building] ?? {}
    game.production[building][trade] = game.production[building][trade] ?? {}

    game.production[building][trade].amount === undefined ?
        game.production[building][trade].amount = amount :
        game.production[building][trade].amount += amount;

    game.production[building][trade].currentAmount === undefined ?
        game.production[building][trade].currentAmount = amount :
        game.production[building][trade].currentAmount += amount;

    game.production[building][trade].output = game.production[building][trade].output ?? outputObject
}

function removeAmounts(field, building) {
    amount = Number(field.dataset.amount)
    trade = field.dataset.trade
    game.production[building][trade].amount -= amount
    game.production[building][trade].currentAmount -= amount
}