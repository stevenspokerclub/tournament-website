const startBtn = document.querySelector("#start-timer");
const resetBtn = document.querySelector("#reset-timer");
const pauseBtn = document.querySelector("#pause-timer");
const inputminutes = document.querySelector("#minutestimer input");
const inputseconds = document.querySelector("#secondstimer input");
const secProgress = document.querySelector("#second-progress");
const minProgress = document.querySelector("#minute-progress");
const timerTable = document.querySelector(".blinds-table");
const timerInnerTable = timerTable.childNodes[1].childNodes;

var running = false;
var seconds;
var startseconds;
var timeElapsed = 0;
var firstTime = true;
var tableRow = 2;   
var oldbackground;

startBtn.addEventListener('click',startClick,false);
pauseBtn.addEventListener('click',pauseClick,false);
inputseconds.addEventListener('keyup',function(e){
    e.preventDefault();
    if (e.keyCode === 13){
        startClick();
    }
},false);


//Initialize Timer at Largest Table Value
setHTML(timerInnerTable[tableRow].childNodes[1].innerHTML * 60);
tableRow+= 2;

function startClick(){
    //Insert value of seconds into variable for future math purposes and check that no other instance is running.
    seconds = Number(inputminutes.value)*60 + Number(inputseconds.value);

    if (!running && seconds > 0){
        running = true;
        countDown(seconds);
        startBtn.style.backgroundColor = "#C32026";
        startBtn.style.border = "none";
        startBtn.style.color = "#FFF";
        pauseBtn.style.backgroundColor = "#FFF";
        pauseBtn.style.border = "5px solid #C32026";
        pauseBtn.style.color = "#000";
         }
    
}
function pauseClick(){
    if(running){
    clearInterval(timeElapsed);
    running = false;
    startBtn.style.backgroundColor = "#FFF";
    startBtn.style.border = "5px solid #C32026";
    startBtn.style.color = "#000";
    pauseBtn.style.backgroundColor = "#C32026";
    pauseBtn.style.border = "none";
    pauseBtn.style.color = "#FFF";
    }
}
function countDown(seconds){

        timeElapsed = setInterval(() => {
            seconds--;
            setHTML(seconds);

            //Flicker for less than one minute
            if (seconds < 60){
                if (seconds % 2 == 0){
                    inputseconds.style.color = "white";
                }
                else {
                    inputseconds.style.color = "black";
                }
            }

            //When finished reset and play sound
            if (seconds == 0){
                endClick();
                if (tableRow == 4){
                    setHTML(timerInnerTable[tableRow].childNodes[1].innerHTML * 60);
                    timerInnerTable[tableRow-2].style.backgroundColor = "rgba(0,0,0,.1)";
                    oldbackground = timerInnerTable[tableRow].style.backgroundColor;
                    timerInnerTable[tableRow].style.backgroundColor = "rgba(195,32,38,0.4)";
                }
                else {
                    setHTML(timerInnerTable[tableRow].childNodes[1].innerHTML * 60);
                    timerInnerTable[tableRow-2].style.backgroundColor = oldbackground;
                    oldbackground = timerInnerTable[tableRow].style.backgroundColor;
                    timerInnerTable[tableRow].style.backgroundColor = "rgba(195,32,38,0.4)";
                }
                
                tableRow+= 2;
                var a = new Audio('sound.mp3');
                a.play();
                setTimeout( function() {
                }, 5000);
                startClick();
            }
        }, 1000);
}
function endClick(){
        seconds = 0;  
        clearInterval(timeElapsed);
        running = false;
        firstTime = true;
        inputminutes.value="";
        inputseconds.value="";
        minProgress.style.height = "0%";
        secProgress.style.height = "0%";
        startBtn.style.backgroundColor = "#FFF";
        startBtn.style.border = "5px solid #C32026";
        startBtn.style.color = "#000";
        pauseBtn.style.backgroundColor = "#FFF";
        pauseBtn.style.border = "5px solid #C32026";
        pauseBtn.style.color = "#000";
}
function setHTML(seconds){
        inputminutes.value = Math.floor(seconds/60);
        inputseconds.value = seconds - Math.floor(seconds/60)*60;

        if (firstTime){
            startseconds = seconds;
            firstTime = false;
        }

        minProgress.style.height = (seconds / startseconds * 100) + "%";
        secProgress.style.height = (inputseconds.value / 60 * 100) + "%";
}

