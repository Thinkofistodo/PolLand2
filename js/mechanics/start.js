<<<<<<< HEAD
function startGame(save) {
    game = JSON.parse(JSON.stringify(saves[save]))
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
        generateMenuBuildings()
        buildingsEventsADDFUN()
        keyboardADDFUN()
        setToNextSeasonDays()
        setBanditCamps()
        changeColorOfResources(true)
        inGameSettings = true
        if (save === "reset") createTextDialog(storyIntroduction.title, storyIntroduction.text, true)
        if (save === "reset") createQuestionDialog("Do you want to view the tutorial?", false, ()=> {
            createDialogsChain(tutorialTitles, tutorialTexts, 0, 5)
        })
    }, 500)
=======
function startGame(save) {
    game = JSON.parse(JSON.stringify(saves[save]))
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
        if (save === "reset") createTextDialog(storyIntroduction.title, storyIntroduction.text, true)
        if (save === "reset") createQuestionDialog("Do you want to view the tutorial?", false, ()=> {
            createDialogsChain(tutorialTitles, tutorialTexts, 0, 5)
        })
    }, 500)
>>>>>>> cd0ae3922d304ec2bb9668cd0fb6fa2aca23da1a
}