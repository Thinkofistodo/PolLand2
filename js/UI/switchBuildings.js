const changeSectionMinusButton = document.querySelector("[data-minus]")
const changeSectionPlusButton = document.querySelector("[data-plus]")
let sectionsNumbers = [...document.querySelectorAll("[data-sectionNumber]")]
let currentSection = 1
let buildingSections

function changeSectionIcon(add, keypadInput){
    if(isDialogOpen) return
    
    if(!keypadInput){
        if (!add && currentSection < 2 ) return
        if (add && currentSection > 3 ) return
        if(add) currentSection++
        if(!add) currentSection--
    }
    
    for (const sectionNumber of sectionsNumbers) {
        sectionNumber.style.transform = `translateY(${-100 * currentSection  + 100}%)`
    }
    moveSection()
}

function changeButtonAppearance(isLesser){
    if (isLesser) {
        changeSectionMinusButton.classList.add("clicked")
        setTimeout(()=>{
            changeSectionMinusButton.classList.remove("clicked")
            return
        }, 100)
    } 
    changeSectionPlusButton.classList.add("clicked")
    setTimeout(()=>{
        changeSectionPlusButton.classList.remove("clicked")
    }, 100)
}

function moveSection(){
    for (const section of buildingSections) {
        section.classList.remove("notHidden")
    }
    buildingSections[currentSection - 1].classList.add("notHidden")
}

changeSectionPlusButton.addEventListener("click", ()=> changeSectionIcon(true, false))
changeSectionMinusButton.addEventListener("click", ()=> changeSectionIcon(false, false))

