<<<<<<< HEAD
function loadingScreen() {
    const loadingScreen = document.querySelector(".loadingScreen")
    loadingScreen.classList.add("zIndex")
    loadingScreen.classList.add("opacity")
    setTimeout(() => {
        loadingScreen.classList.remove("opacity")
        setTimeout(() => {
            loadingScreen.classList.remove("zIndex")
        }, 500)
    }, 4000)
=======
function loadingScreen() {
    const loadingScreen = document.querySelector(".loadingScreen")
    loadingScreen.classList.add("zIndex")
    loadingScreen.classList.add("opacity")
    setTimeout(() => {
        loadingScreen.classList.remove("opacity")
        setTimeout(() => {
            loadingScreen.classList.remove("zIndex")
        }, 500)
    }, 4000)
>>>>>>> cd0ae3922d304ec2bb9668cd0fb6fa2aca23da1a
}