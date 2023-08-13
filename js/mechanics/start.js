function startGame(save) {
    game = JSON.parse(JSON.stringify(saves[save]))
    if (generateRandomInteger(2) === 2 && save === "reset") game.map = secondMap
    loadingScreen()

    hideMenu()
    hideMenuDialog()
    changeSoundtrack(goalsSoundtracks[game.currentGoal])
    setTimeout(()=> {
        toggleBlockBottomSection("active")
        toggleShowTurns("active")
        generateMap()
        updateAllResources()
        removeBackgroundImage()
        setTurnNumber()
        if(!document.querySelector(".buildings_section")) generateMenuBuildings()
        buildingsEventsADDFUN()
        keyboardADDFUN()
        setToNextSeasonDays()
        setBanditCamps()
        changeColorOfResources(true)
        inGameSettings = true
        isResourceDialogOpen = false
        if (save === "reset") createTextDialog(storyIntroduction.title, storyIntroduction.text, true)
        if (save === "reset") createQuestionDialog("Do you want to view the tutorial?", false, ()=> {
            createDialogsChain(tutorialTitles, tutorialTexts, 0, 5)
        })
    }, 500)
}