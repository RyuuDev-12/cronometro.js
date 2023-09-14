const minElement = document.querySelector('#minutes')
const secElement = document.querySelector('#seconds')
const miliSecElement = document.querySelector('#miliseconds')
const startBtn = document.querySelector('#startBtn')
const pauseBtn = document.querySelector('#pauseBtn')
const resumeBtn = document.querySelector('#resumeBtn')
const resetBtn = document.querySelector('#resetBtn')
const lapBtn = document.querySelector('#lapBtn')
const laps = document.querySelector('#laps')
let miliSeconds = 0
let seconds = 0
let minutes = 0
let myInterval
const twoDigits = [minElement, secElement]

// formatação de numeros ------------/

let miliFormat = new Intl.NumberFormat('pt-BR',
    {minimumIntegerDigits: 3}
)
let formatter = new Intl.NumberFormat('pt-BR',
    {minimumIntegerDigits: 2}
)

// função de começar ------------/

startBtn.addEventListener('click', ()=>{
    myInterval = setInterval(start, 10)

    pauseBtn.style.display = 'inline'
    resetBtn.style.display = 'inline'
    startBtn.style.display = 'none'
    lapBtn.style.display = 'inline'
})

function start(e){

    
    // calculo de tempo -----------------/

    if(miliSeconds == 990){
        miliSeconds = 0
        seconds ++
        secElement.textContent = formatter.format(seconds)
    }else if(seconds == 60){
        seconds = 0
        minutes ++
        minElement.textContent = formatter.format(minutes)
    }else{
        miliSeconds += 10
        miliSecElement.textContent = miliFormat.format(miliSeconds)
    }

    startBtn.removeEventListener('click', start)  
}

// função de reset ------------------/

resetBtn.addEventListener('click', ()=>{
    clearInterval(myInterval)
    miliSecElement.textContent = '000'

    twoDigits.forEach(item =>{item.textContent = '00'})
    miliSeconds = 0
    seconds = 0
    minutes = 0
    startBtn.style.display = 'inline'
    pauseBtn.style.display = 'none'
    resetBtn.style.display = 'none'
    lapBtn.style.display = 'none'
    resumeBtn.style.display = 'none'
})

// função de pause ------------------/

pauseBtn.addEventListener('click', ()=>{
    clearInterval(myInterval)
    pauseBtn.style.display = 'none'
    resumeBtn.style.display = 'inline'
})

// função de continuar

resumeBtn.addEventListener('click', ()=>{
    myInterval = setInterval(start, 10)
    pauseBtn.style.display = 'inline'
    resumeBtn.style.display = 'none'
})

// função de salvar volta

let accumulator = 1

lapBtn.addEventListener('click', ()=>{
    
    laps.innerHTML += `
    <li>Volta 
        ${accumulator} -
        ${formatter.format(minutes)}:
        ${formatter.format(seconds)}:
        ${miliFormat.format(miliSeconds)}
    </li>`
    
    accumulator ++
})

// funções de teclado (pausar e continuar com teclado)

document.addEventListener('keydown', (e)=>{
    if(e.key == " "){
        if(miliSeconds == 0 && seconds == 0 && minutes == 0){
            myInterval = setInterval(start, 10)
        
            pauseBtn.style.display = 'inline'
            resetBtn.style.display = 'inline'
            startBtn.style.display = 'none'
        }else if(resumeBtn.style.display == 'inline'){
            myInterval = setInterval(start, 10)
            
            pauseBtn.style.display = 'inline'
            resetBtn.style.display = 'inline'
            resumeBtn.style.display = 'none'
            startBtn.style.display = 'none'
        }else{
            clearInterval(myInterval)

            resumeBtn.style.display = 'inline'
        } 
    }
})