const error = document.querySelector(".error")
let isDialogOpen = false
let fieldsThatAlreadyHasListener = []
const logs = []

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

function generateRandomIntegerMinMax(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function displayError(desc){
    clearTimeout(startRemovingTextTimeout)
    clearTimeout(removeTextTimeout)
    error.innerText = desc
    error.classList.remove("displayNoneDayText")
    error.classList.add("showDayText")
    error.innerText = desc
    startRemovingTextTimeout = setTimeout(()=>{
    error.classList.remove("showDayText")
        removeTextTimeout = setTimeout(()=>{
                error.classList.add("displayNoneDayText")
                // transition length 500ms
            }, 500)
    }, 2000)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

function readLogs() {
    for (const log of logs) console.log(log);
}

function addLog(log) {
    logs.push(log)
}
function clearLogs() {
    logs.length = 0
    console.clear()
}