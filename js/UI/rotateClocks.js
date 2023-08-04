const turns = document.querySelector(".resources_buttons-seasons")
const turnSide = document.querySelector(".turnSide")
const seasonSide = document.querySelector(".seasonSide")

turns.addEventListener("click", ()=>{
    turnSide.classList.toggle("rotateSide")
    seasonSide.classList.toggle("rotateSide")
    playClick()
})


