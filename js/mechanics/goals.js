function checkResourcesGoal(resources) {
    for (const resource of resources) {
       
        const data = getTypeResource(resource[0], resource[1])
        if (data < resource[2]) return false
    }
    return true
}

function checkIfGoalAchieved() {
    const goal = goals[game.currentGoal];

    if (goal.type === "resourceGoal") {
        if (checkResourcesGoal(goal.materials)) {
            game.currentGoal++;
            game.turns = goals[game.currentGoal].turns
            changeSoundtrack(goalsSoundtracks[game.currentGoal])
            currentPlaying = goalsSoundtracks[game.currentGoal]
            isDialogOpen = true;
            createTextDialog(goal.text.title, goal.text.body)
        }
    } else {
        if (game.destroyedCamps.length === 3) {
            return showEndScreen("Your greatness, my Lord, surpasses all reasoning.", "From neglected land, you've created a home for the people, established fertile fields, and built essential infrastructure. You have repelled countless marauder attacks and shattered the largest bandit group that has threatened the kingdom in a long time! I am convinced that a bright future awaits you!");
        }
    }
}


