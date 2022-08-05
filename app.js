const closeRulesPopup = document.querySelector('.close-rules')

const openRulesPopup = document.querySelector('.view-rules')
const rulesPopup = document.querySelector('.rules-overlay')
let isClosing;

//-----------------------------------
const selectPage = document.querySelector('.select')
const selects = document.querySelectorAll('.triangle div')

let picked
const pickedPage = document.querySelector('.picked')
const pickedImageNewDiv = document.querySelector('.your-outcome div')
let pickedImageNew = document.querySelector('.your-outcome div img')

const pickedImageNewDivComputer = document.querySelector('.computers-outcome div')
let pickedImageNewComputer = document.querySelector('.computers-outcome div img')

//-----------------------------------
const outcomeText = document.querySelector('.outcome h1')
const playAgainBtn = document.querySelector('.outcome button')


//-----------------------------------

let scoreShown = document.querySelector('.score-container p.score')
let score;

//-----------------------------------

startGame()

playAgainBtn.addEventListener('click', refreshGame)

function refreshGame(){
    playAgainBtn.classList.add('cant-click')
    outcomeText.textContent = ` `
    //close rules
    rulesPopup.classList.add('close')
    //open select page
    selectPage.classList.remove('close')
    //closes picked page
    pickedPage.classList.add('close')
}

function startGame(){
//checks if you have played the game before
    if (localStorage.getItem("score") == null) {
        localStorage.setItem('score', 0)
        score = parseInt(localStorage.getItem("score"))
        scoreShown.innerHTML = score
    }else{
        score = parseInt(localStorage.getItem('score'))
        scoreShown.innerHTML = score
    }

    selects.forEach((item)=>{
            item.style.pointerEvents = 'none'
        })

//close rules functionality
    closeRulesPopup.addEventListener('click', ()=>{
        isClosing = true
        rulesPopup.classList.remove('open')
        rulesPopup.classList.add('close')
        selects.forEach((item)=>{
            item.style.pointerEvents = 'initial'
        })
    })

    rulesPopup.addEventListener('animationend', (e)=>{
    if (isClosing) {
        e.currentTarget.style.display = 'none' 
    }
    })

//open rules functionality
    openRulesPopup.addEventListener('click', ()=>{
        isClosing = false
        rulesPopup.style.display = 'grid'
        rulesPopup.classList.remove('close')
        rulesPopup.classList.add('open')
        selects.forEach((item)=>{
            item.style.pointerEvents = 'none'
        })
    })

    
//picking functionality for human
    selects.forEach((item)=>{
        item.addEventListener('click', (e)=>{
        let pickedItemsImage = e.currentTarget.children[0].src
        selectPage.classList.add('close')
        pickedPage.classList.remove('close')
        pickedImageNew.src = pickedItemsImage
        pickedImageNewDiv.classList =  e.currentTarget.children[0].alt.toLowerCase()
        picked = true
        compare(picked)
        })
    
    })

//picking functionality for computer
    let options = [
        {
            src: `/images/icon-scissors.svg`,
            name: `scissors`
        },
        {
            src: `/images/icon-rock.svg`,
            name: `rock`
        },
        {
            src: `/images/icon-paper.svg`,
            name: `paper`
        }
    ]

//winning and losing functionality
    function compare(value){
        if (value == true) {
            let randomNumber = Math.floor( Math.random() * 3 )

            pickedImageNewComputer.src = options[randomNumber].src

            pickedImageNewDivComputer.classList = options[randomNumber].name

            let computerValue = pickedImageNewDivComputer.classList[0]

            let humanValue = pickedImageNewDiv.classList[0]

            if (computerValue == humanValue) {
            setTimeout(() => {
            outcomeText.textContent = `IT'S A DRAW`      
            playAgainBtn.classList.remove('cant-click')  
                }, 1000);
            }else if(humanValue == 'rock' && computerValue == 'paper' || humanValue == 'paper' && computerValue == 'scissors' || humanValue == 'scissors' && computerValue == 'rock' ){
                setTimeout(() => {
                outcomeText.textContent = `YOU LOSE`
                pickedImageNewDiv.classList.remove('winner')
                pickedImageNewDivComputer.classList.add('winner')
            
                if (score == 0) {
                    playAgainBtn.classList.remove('cant-click')
                    return
                }
                score = score -1
                localStorage.setItem('score', score)
                scoreShown.innerHTML = score
                playAgainBtn.classList.remove('cant-click')
                }, 1000);     
            
            }else{
                setTimeout(() => {
                outcomeText.textContent = `YOU WIN`
                pickedImageNewDivComputer.classList.remove('winner')
                pickedImageNewDiv.classList.add('winner')  
                score = score + 1
                localStorage.setItem('score', score)
                scoreShown.innerHTML = score
                playAgainBtn.classList.remove('cant-click')
                }, 1000);
                
            }
    }
    }
}