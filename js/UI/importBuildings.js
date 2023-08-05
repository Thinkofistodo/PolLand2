const buildings = document.querySelector(".buildings")


function generateMenuBuildings() {
    for (let index = 0; index < housesSections.length; index++) {
        // create section
        const buildingsSection = document.createElement("section")
        if (index === 0) buildingsSection.classList.add("notHidden")
        buildingsSection.classList.add("buildings_section")
        buildingsSection.dataset.section = index + 1

        // create buildings
        for (const building of housesSections[index]) {

            // wrap
            const buildingWrap = document.createElement("div")
            buildingWrap.classList.add("buildings_building")
            if (dialogBuildings.includes(building)) buildingWrap.classList.add("clickableBuilding")
            buildingWrap.dataset.id = building
            
            // title
            const buildingTitle = document.createElement("h1")
            buildingTitle.classList.add("buildings_building-title")
            buildingTitle.innerText = building.replace("_", " ").replace("_", " ").replace("_", " ")

            // image
            const buildingImage = document.createElement("img")
            buildingImage.classList.add("buildings_building-icon")
            buildingImage.src = `./src/buildings/${building}.${gifs.includes(building) ? "gif" : "png"}`

            // cost
            const buildingCost = document.createElement("p")
            buildingCost.classList.add("buildings_building-cost")

            for (const resource of game.buildingsCosts[building]) {
                const cost = document.createElement("p")
                cost.innerText = resource[0];
                cost.id = `${building}_${resource[1]}`
                
                const icon = document.createElement("img")

                icon.src = `./src/resources/${resource[1]}.png`
                icon.classList.add("costIconSize")

                const costWrap = document.createElement("div")
                costWrap.classList.add("costWrap")
                costWrap.appendChild(cost)
                costWrap.appendChild(icon)

                buildingCost.appendChild(costWrap)
            }

            // adding childs
            buildingWrap.appendChild(buildingTitle)
            buildingWrap.appendChild(buildingImage)
            buildingWrap.appendChild(buildingCost)
            buildingsSection.appendChild(buildingWrap)
        }

        buildings.appendChild(buildingsSection)
    }
    buildingSections = [...document.querySelectorAll(".buildings_section")]
}


