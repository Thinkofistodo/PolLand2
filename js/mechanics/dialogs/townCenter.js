function towncenterDialogHTML(field, building){

    const header = `
        <div class="dialog_building-header">

         
            <h2 class="dialog_building-header--subtitle">Goal: ${goals[game.currentGoal].todo}</h2>
        </div>`

    // informacje questy budynki surowce  
    const buttons = `
        <div class="dialog_towncenter-buttons">
            <button class="dialog_towncenter-button">Information</button>
            <button class="dialog_towncenter-button">Quests</button>
            <button class="dialog_towncenter-button">Buildings</button>
            <button class="dialog_towncenter-button">Resources</button>
        </div>`

    const hero = `<div class="dialog_towncenter-hero"></div>`

    const informations = `
        <div class="dialog_towncenter-informations">
         

            <div class="dialog_towncenter-buildings">

                ${createTowncenterBuildings()}

         </div>

    
        </div>`


    const main = `
        <div class="dialog_building-content">
            
            ${informations}
            <button class="closeButton">Close</button>
        </div>`

    return hero + header + main
}

function createBuildingInformation(index) {
    return  `<div class="dialog_towncenter-building">
                <div class="dialog_towncenter-wrap1">
                    <img src="./src/buildings/${nameAndDescription[index][0]}" class="dialog_towncenter-building--image">
                    <h2 class="dialog_towncenter-building--text">${nameAndDescription[index][0].replace("_", " ").substring(0, nameAndDescription[index][0].length-4)}</h2>  
                </div>
                <div class="dialog_towncenter-wrap23">
                <div class="dialog_towncenter-wrap2">
                <p class="dialog_towncenter-building--text">Production:<br> <span class="manual ${dialogBuildings.includes(nameAndDescription[index][0].substring(0, nameAndDescription[index][0].length-4)) ? "glow" : ""}">${production[index]}</span></p>    
                    <p class="dialog_towncenter-building--text">Requires:<br>
                        ${getTownCenterImages(index, "requirements")}
                     </p>  
                    <p class="dialog_towncenter-building--text">Produces:<br> 
                        ${getTownCenterImages(index, "produces")}
                    </p>
                </div>
                <div class="dialog_towncenter-wrap3">
                    <p class="dialog_towncenter-building--text">${nameAndDescription[index][1]}</p>   
                </div>
                </div>
            </div>`
}

function getTownCenterImages(index, table) {
    string = ""
    if (table === "requirements") {
        for(path of requirements[index]) {
            string += `<img src="${path}" class="dialog_towncenter-building--icon">
            `;
        }
    } else {
        for(path of produces[index]) {
            string += `<img src="${path}" class="dialog_towncenter-building--icon">
            `;
        }
    }
    

    return string
}

function createTowncenterBuildings() {
    string = ""

    for(let i = 0; i < 26; i++){
        string += createBuildingInformation(i);
    }

    return string
}