
// here bgins functions for drawing overlays

const circleCTX = document.getElementById("circle-overlay-canvas").getContext("2d")
circleCTX.strokeStyle = 'white'
circleCTX.beginPath()
circleCTX.arc(450, 450, 150, 0, Math.PI * 2)
circleCTX.stroke()
circleCTX.beginPath()
circleCTX.arc(450, 450, 300, 0, Math.PI * 2)
circleCTX.stroke()
circleCTX.beginPath()
circleCTX.arc(450, 450, 450, 0, Math.PI * 2)
circleCTX.stroke()

const gridCTX = document.getElementById("grid-overlay-canvas").getContext("2d")
gridCTX.strokeStyle = 'white'
gridCTX.beginPath()
gridCTX.moveTo(150, 0)
gridCTX.lineTo(150, 900)
gridCTX.moveTo(300, 0)
gridCTX.lineTo(300, 900)
gridCTX.moveTo(450, 0)
gridCTX.lineTo(450, 900)
gridCTX.moveTo(600, 0)
gridCTX.lineTo(600, 900)
gridCTX.moveTo(750, 0)
gridCTX.lineTo(750, 900)

gridCTX.moveTo(0, 150)
gridCTX.lineTo(900, 150)
gridCTX.moveTo(0, 300)
gridCTX.lineTo(900, 300)
gridCTX.moveTo(0, 450)
gridCTX.lineTo(900, 450)
gridCTX.moveTo(0, 600)
gridCTX.lineTo(900, 600)
gridCTX.moveTo(0, 750)
gridCTX.lineTo(900, 750)
gridCTX.closePath()
gridCTX.stroke()

// here begins the overlay buttons

const circleButton = document.getElementById("circle-overlay-button")
const circleCanvas = document.getElementById("circle-overlay-canvas")

circleButton.addEventListener("click", function () {
    circleCanvas.classList.toggle("canvas-invisible")
    circleButton.classList.toggle('overlay-button-litup')
})

const gridButton = document.getElementById("grid-overlay-button")
const gridCanvas = document.getElementById("grid-overlay-canvas")

gridButton.addEventListener("click", function () {
    gridCanvas.classList.toggle("canvas-invisible")
    gridButton.classList.toggle('overlay-button-litup')
})

gridButton.click()
circleButton.click()

// here begins the colour selection

let palletList = {
    'first': ['#f37e21', '#29aae1', '#fbaf41', '#fced22', '#c7e9f3', '#ffc712', '#efa8ae', '#b2d136', '#85328a', '#ec1563'],
    'second': ['#a4bcf7', '#f4f1bd', '#f4d9e2', '#a4bcf7', '#f4d9e2'],
    'third': ['#00a1a3', '#ff6ba0', '#e11246', '#fba96f', '#6e154f', '#ffc712'],
    'fourth': ['#6db8db', '#e7d4d3', '#d579ab', '#f5f4ec', '#4e5873',],
    'fifth': ['#d49924', '#ebd7a9', '#cd0761', '#62aba9',],
    'sixth': ['#f2eb3b', '#fcc11b', '#f58e05', '#ed5523', '#ef3327', '#b2204d', '#7d3392', '#483296', '#3f5eae', '#00adae', '#63b247', '#d3e03b'],
    'seventh': ['#a51c46', '#ff4e23', '#f6be11', '#0eb4b0', '#473291'],
    'eigth': ['#660099', '#3d005b', '#d1b2e0', '#eae0cc'],
}


const colourOptionsDiv = document.getElementById("colour-options-div")
const palletSelector = document.getElementById('pallet-selector')

function addBWI(){ // adds black, white and invis.
    let nodeToAppend = document.createElement('button')
    nodeToAppend.classList.add('colour-circle')
    nodeToAppend.classList.add('colour-button')
    nodeToAppend.style.backgroundColor = 'black'
    colourOptionsDiv.appendChild(nodeToAppend)

    nodeToAppend = document.createElement('button')
    nodeToAppend.classList.add('colour-circle')
    nodeToAppend.classList.add('colour-button')
    nodeToAppend.style.backgroundColor = 'white'
    colourOptionsDiv.appendChild(nodeToAppend)

    nodeToAppend = document.createElement('button')
    nodeToAppend.classList.add('colour-circle')
    nodeToAppend.classList.add('colour-button')
    nodeToAppend.style.backgroundColor = 'rgb(50, 50, 50)'
    colourOptionsDiv.appendChild(nodeToAppend)
}


//load initial colours
for (let colour of palletList['first']){
    let nodeToAppend = document.createElement('button')
    nodeToAppend.classList.add('colour-circle')
    nodeToAppend.classList.add('colour-button')
    nodeToAppend.style.backgroundColor = colour
    colourOptionsDiv.appendChild(nodeToAppend)
}
addBWI()
colourOptionsDiv.firstElementChild.setAttribute('id', 'colour-circle-lit')

//here begins what happens when you click a colour button

let currentColour = '#f37e21'

function addNewPalletListener(){
    const colourButtons = document.querySelectorAll('.colour-button')
    for (let button of colourButtons){
        button.addEventListener('click', (event) => {
            for (let button2 of colourButtons){
                button2.removeAttribute('id')
            }
            currentColour = event.target.style.backgroundColor
            console.log(currentColour)
            event.target.setAttribute('id', 'colour-circle-lit')
        })
    }
}


addNewPalletListener()

// here begins what happens when you click a new pallet
palletSelector.addEventListener('input', (e) => {
    while (colourOptionsDiv.firstChild) {
        colourOptionsDiv.removeChild(colourOptionsDiv.lastChild);
    }
    for (let colour of palletList[palletSelector.value]){
        let nodeToAppend = document.createElement('button')
        nodeToAppend.classList.add('colour-circle')
        nodeToAppend.classList.add('colour-button')
        nodeToAppend.style.backgroundColor = colour
        colourOptionsDiv.appendChild(nodeToAppend)
    }
    addBWI()
    addNewPalletListener()
})

//animation
//asdf


// here begins main canvas drawing

const mainCanvas = document.getElementById('main-canvas')
const clickableCanvas = document.getElementById('clickable-canvas')
const mainCTX = mainCanvas.getContext('2d')
mainCTX.fillStyle = ('rgb(50, 50, 50)')
mainCTX.fillRect(0, 0, 900, 900)
let rect
let isPainting = false
let points = []

let cursorSize = 10
const sizeSlider = document.getElementById('size-slider')
// clickableCanvas.style.setProperty("--cursor", "url('cursor10.png') 5 5")

function sizeSliderChanges(){
    cursorSize = sizeSlider.value
    console.log(cursorSize)

    // scales and sets custom cursor for canvas
    const tempCursorCanvas = document.createElement('canvas')
    const tempCursorCTX = tempCursorCanvas.getContext('2d')
    const bigCursorImage = document.createElement('img')
    bigCursorImage.src = 'cursor.png'
    bigCursorImage.addEventListener('load', (e) =>{
        tempCursorCanvas.width = sizeSlider.value
        tempCursorCanvas.height = sizeSlider.value
        tempCursorCTX.drawImage(bigCursorImage, 0, 0, sizeSlider.value, sizeSlider.value)
        const cursorAfterResize = tempCursorCanvas.toDataURL()
        clickableCanvas.style.setProperty("--cursor", `url(${cursorAfterResize}) ${sizeSlider.value / 2} ${sizeSlider.value / 2}`)
    })
    
}


// sizeSliderChanges()
clickableCanvas.style.setProperty("--cursor", "url('cursor10.png') 5 5")

sizeSlider.addEventListener('change', sizeSliderChanges)

// function getMousePosition(canvas, event) {
//     let rect = clickableCanvas.getBoundingClientRect();
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;
//     console.log("Coordinate x: " + x, "Coordinate y: " + y);
// }

let undoState
clickableCanvas.addEventListener('mousedown', (event) => {
    isPainting = true
    undoState = mainCanvas.toDataURL()
    if (event.shiftKey){  // straight line shift key draw
        rect = clickableCanvas.getBoundingClientRect()
        let currentX = event.clientX - rect.left
        let currentY = event.clientY - rect.top

        mainCTX.lineWidth = cursorSize
        mainCTX.lineCap = 'round'
        mainCTX.strokeStyle = currentColour

        mainCTX.moveTo(lastPointX, lastPointY)
        mainCTX.lineTo(currentX, currentY)
        mainCTX.stroke()

        mainCTX.moveTo(900 - lastPointX, lastPointY)
        mainCTX.lineTo(900 - currentX, currentY)
        mainCTX.stroke()

        mainCTX.moveTo(lastPointX, 900 - lastPointY)
        mainCTX.lineTo(currentX, 900 - currentY)
        mainCTX.stroke()

        mainCTX.moveTo(900 - lastPointX, 900 - lastPointY)
        mainCTX.lineTo(900 - currentX, 900 - currentY)
        mainCTX.stroke()
        
    }
})


let lastPointX
let lastPointY
clickableCanvas.addEventListener('mouseup', (event) => {
    isPainting = false
    points = []
    rect = clickableCanvas.getBoundingClientRect()
    lastPointX = event.clientX - rect.left
    lastPointY = event.clientY - rect.top
    mainCTX.beginPath()
    
})


clickableCanvas.addEventListener('mousemove', (event) => {
    if (!isPainting) {
        return
    }
    rect = clickableCanvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    points.push([x, y])
    // getMousePosition(mainCanvas, event)
    drawAll()
})


function drawAll() {
    mainCTX.lineWidth = cursorSize
    mainCTX.lineCap = 'round'
    mainCTX.strokeStyle = currentColour


    for (let i = 0; i < points.length - 1; i++){
        // mainCTX.beginPath()
        // let x_mid = (points[i][0] + points[i+1][0]) / 2;
        // let y_mid = (points[i][1] + points[i+1][1]) / 2;
        // let cp_x1 = (x_mid + points[i][0]) / 2;
        // let cp_x2 = (x_mid + points[i+1][0]) / 2;
        // mainCTX.quadraticCurveTo(cp_x1,points[i][1] ,x_mid, y_mid);
        // mainCTX.quadraticCurveTo(cp_x2,points[i+1][1] ,points[i+1].x,points[i+1].y);

        mainCTX.beginPath()
        mainCTX.moveTo(points[i][0], points[i][1])
        mainCTX.lineTo(points[i+1][0], points[i+1][1])  // quadratic curve to?
        mainCTX.stroke()

        mainCTX.beginPath()
        mainCTX.moveTo(900 - points[i][0], points[i][1])
        mainCTX.lineTo(900 - points[i+1][0], points[i+1][1])
        mainCTX.stroke()

        mainCTX.beginPath()
        mainCTX.moveTo(points[i][0], 900 - points[i][1])
        mainCTX.lineTo(points[i+1][0], 900 - points[i+1][1])
        mainCTX.stroke()

        mainCTX.beginPath()
        mainCTX.moveTo(900 - points[i][0], 900 - points[i][1])
        mainCTX.lineTo(900 - points[i+1][0], 900 - points[i+1][1])
        mainCTX.stroke()
    }
}

// save, clear and undo buttons
document.getElementById('clear-button').addEventListener('click', (e) => {
    mainCTX.fillStyle = 'rgb(50, 50, 50)'
    mainCTX.fillRect(0, 0, 900, 900)
})

const undoButton = document.getElementById('undo-button')
undoButton.addEventListener('click', (e) => {
    mainCTX.fillStyle = 'rgb(50, 50, 50)'
    mainCTX.fillRect(0, 0, 900, 900)
    let imageToLoad = new Image()
    imageToLoad.src = undoState
    imageToLoad.addEventListener('load', (e) =>{
        mainCTX.drawImage(imageToLoad, 0, 0, 900, 900)
    })
})


document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'z'){
        undoButton.click()
    }
})


const saveButton = document.getElementById('save-button')
saveButton.addEventListener('click', (e) => {
    window.open(mainCanvas.toDataURL())
})



// scroll wheel
clickableCanvas.addEventListener('wheel', (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (isPainting){
        return
    }

    if (event.deltaY < 0){
        sizeSlider.value = (Number(sizeSlider.value) + 2).toString()
    }
    else if (event.deltaY > 0){
        sizeSlider.value = (Number(sizeSlider.value) - 2).toString()
    }
    sizeSliderChanges()
    console.log(sizeSlider.value)
    // return
})