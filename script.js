const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width")
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color")
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color")

const sketchArea = document.querySelector("#sketch-area");
const slider = document.querySelector("#slider")
const sliderValue = document.querySelector("#slider-value")

const gridToggle = document.querySelector("#grid-toggle");
const eraseToggle = document.querySelector("#erase");
const shaderToggle = document.querySelector("#shader")
const rainbowsToggle = document.querySelector("#rainbows")

let squaresPerSide = 16;
let gridVisible = false;
let isDrawing = false;
let erasing = false;
let rainbowing = false;

function toggleGrid() {
    gridVisible = gridVisible ? false : true;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridCell();
    gridMaker();
}


function toggleEraser(){
    rainbowing =false;
    rainbowsToggle.style.color = inactiveColor;
    erasing = erasing ? false : true;
    eraseToggle.style.color = erasing ? accentColor : inactiveColor;
}

function toggleRainbows(){
    erasing = false;
    eraseToggle.style.color = inactiveColor;
    rainbowing = rainbowing ? false : true;
    rainbowsToggle.style.color = rainbowing ? accentColor : inactiveColor;
}



function changeBackgroundColor(e){
    let newRanColor = ranColor();
    let changeColorTo;
    if (erasing){
        changeColorTo = "white";
    } else if (rainbowing){
        changeColorTo = newRanColor;
    } else {changeColorTo = "black"}
    
    if (e.type === "mousedown"){
        isDrawing = true;
    } else if (e.type === "mouseover" && isDrawing === true){
        e.target.style.backgroundColor = `${changeColorTo}`;
    } else isDrawing = false;
}

function ranColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function gridMaker (){
    for (let i = 0; i < (squaresPerSide * squaresPerSide); i++){
        console.log("i");
        const gridCell = document.createElement("div");
        let widthOrHeight = 0;

        if (gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide) -2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        } else if (!gridVisible){
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = gridCell.style.height = widthOrHeight;

        gridCell.addEventListener("mousedown", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseover", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseup", (e) => changeBackgroundColor(e));

        gridCell.addEventListener("dragstart", (e) => {e.preventDefault()})
        sketchArea.appendChild(gridCell);

    }
}


gridToggle.addEventListener("click", toggleGrid);
eraseToggle.addEventListener("click", toggleEraser);
rainbowsToggle.addEventListener("click", toggleRainbows);

gridMaker();

function removeGridCell() {
    while(sketchArea.firstChild){
        sketchArea.removeChild(sketchArea.firstChild)
    }
}

slider.oninput = function(){
    squaresPerSide = this.value;
    sliderValue.textContent = `${this.value} X ${this.value} (Resolution)`;
    removeGridCell();
    gridMaker();
}





