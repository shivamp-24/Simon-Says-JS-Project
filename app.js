let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

//first step
//any key is pressed => game start + one button flash

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game started");
        started = true;

        levelUp();
    }
})

let h2 = document.querySelector("h2");

function levelUp() {
    //new level starting
    //reset userSeq and increase level
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    //then call gameFlash() for this button
    //btnFlash will change background color to white for some time

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("gameFlash");

    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 100);
}

//next step is to track what buttons user presses and check whether it is correct

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 100);
}

function btnPress() {
    //now the button which is pressed needs to be flashed
    //when user presses we will change background color to white using userFlash() function
    let btn = this;
    userFlash(btn);

    //need to push pressed button color in userSeq
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    //now we need to check whether pressed color matches game sequence
    checkAns(userSeq.length - 1);
}

let h3 = document.querySelector("h3");

function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            //current level is completed
            //need to start new level after some time
            setTimeout(levelUp, 1000);
        }
    }
    else {
        //now need to reset game to initial settings and flash red over screen
        h2.innerHTML = `Game Over! Your score was ${level} <br> Press any key to start.`;
        if(level > highScore) {
            highScore = level;
        }

        h3.innerText = `Max. Score: ${highScore}`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}