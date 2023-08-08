const seasonNumber = document.querySelector(".seasonNumber")

function changeSeason() {
    game.daysToNextSeason--;
    if (game.daysToNextSeason === 0) {
        game.currentSeason = ++game.currentSeason % 4;
        game.daysToNextSeason = seasons[game.currentSeason][1]

        if (getSeason() === "winter") {

            const houses = [...document.querySelectorAll("[data-building=house]")]
            add("nextResources", "coal", -1 * houses.length)
            const fishermans = [...document.querySelectorAll("[data-building=fisherman]")]
            const amounts = fishermans.reduce((prev, next)=> {
                return prev + Number(next.dataset.amount)
            }, 0)
            add("nextResources", "food", -1 * amounts)
            updateSingleResource("food");
            updateSingleResource("coal");

            setCottonAndWheatUI()

            document.querySelectorAll("[data-field]").forEach(field => {
                field.setAttribute("data-frozen", "true")
            })
        }
    
        if (getSeason() === "spring") {
            const houses = [...document.querySelectorAll("[data-building=house]")]
            add("nextResources", "coal", houses.length)
            const fishermans = [...document.querySelectorAll("[data-building=fisherman]")]
            const amounts = fishermans.reduce((prev, next)=> {
                return prev + Number(next.dataset.amount)
            }, 0)
            add("nextResources", "food", amounts)
            updateSingleResource("food");
            updateSingleResource("coal");
            setCottonAndWheatUI()

            document.querySelectorAll("[data-field]").forEach(field => {
                field.setAttribute("data-frozen", "false")
            })
        }

        if (getSeason() === "summer") {
            const farmlands = [...document.querySelectorAll("[data-building=farmland]")]
            let farmlandsNumber = farmlands.length
            for (const farmland of farmlands) if (farmland.dataset.waterAccess !== "true") farmlandsNumber--;
            
            add("nextResources", "wheat", farmlandsNumber)
            updateSingleResource("wheat");

            document.querySelectorAll("[data-field]").forEach(field => {
                field.setAttribute("data-frozen", "summer")
            })
        }

        if (getSeason() === "autumn") {
            const farmlands = [...document.querySelectorAll("[data-building=farmland]")]
            let farmlandsNumber = farmlands.length
            for (const farmland of farmlands) if (farmland.dataset.waterAccess !== "true") farmlandsNumber--;

            add("nextResources", "wheat", -farmlandsNumber)
            updateSingleResource("wheat");

            document.querySelectorAll("[data-field]").forEach(field => {
                field.setAttribute("data-frozen", "false")
            })
        }

    }
    setToNextSeasonDays();
}

function setToNextSeasonDays() {
    seasonNumber.innerText = game.daysToNextSeason
}

function getSeason() {
    return seasons[game.currentSeason][0]
}