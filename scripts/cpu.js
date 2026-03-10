let playerMark = localStorage.getItem("playerMark");
let cpuMark = playerMark === "X" ? "O" : "X";

let isPlayerTurn = playerMark === "X" ? true : false;
let wasPlayerLastTurn = isPlayerTurn;

let boxes = document.querySelectorAll(".grid button");
let turnText = document.querySelector(".turn-text");
let resetbtn = document.querySelector(".btn-reset");

let levelSelect = document.querySelector("#level");

let gotAWinner = false;

let XScore = 0;
let OScore = 0;
let draws = 0;
let XScoreVal = document.querySelector(".XScoreVal");
let OScoreVal = document.querySelector(".OScoreVal");
let drawVal = document.querySelector(".drawVal");

const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

/* ========================================================================= */

const onMouseOver = (event) => {
    let box = event.target;

    if (isPlayerTurn) {
        box.textContent = playerMark;
        box.classList.add(`${playerMark}-ready`);
    }
};

const onMouseOut = (event) => {
    let box = event.target;

    if (isPlayerTurn) {
        box.classList.remove(`${playerMark}-ready`);
        box.textContent = "";
    }
};

const onClick = (event) => {
    let box = event.target;

    if (isPlayerTurn) {
        box.textContent = playerMark;
        box.classList.add(playerMark);
        box.classList.remove(`${playerMark}-ready`);

        isPlayerTurn = false;
        updateTurnText();

        stopInteraction(box);

        winCheck();

        if (!isGridFilled()) {
            callCpu();
        }
    }
};

/* ========================================================================= */

boxes.forEach((box) => {
    startInteraction(box);
});

resetbtn.addEventListener("click", () => {
    wasPlayerLastTurn = !wasPlayerLastTurn;
    //flipping this value to preserve the first player in the resetted game

    reset();
});

callCpu();

/* ========================================================================= */

function winCheck() {
    let highlighted = false;

    for (i of winStates) {
        if (boxes[i[0]].textContent != "" && boxes[i[0]].textContent === boxes[i[1]].textContent && boxes[i[1]].textContent === boxes[i[2]].textContent) {
            if (!isPlayerTurn) {
                gotAWinner = true;
                updateScore(playerMark);

                for (let j = 0; j <= 2; j++) {
                    boxes[i[j]].classList.add(`${playerMark}-win`);
                    highlighted = true;
                }
            } else {
                gotAWinner = true;
                updateScore(cpuMark);

                for (let j = 0; j <= 2; j++) {
                    boxes[i[j]].classList.add(`${cpuMark}-win`);
                    highlighted = true;
                }
            }

            boxes.forEach((box) => {
                stopInteraction(box);
            });

            beginReset();

            if (highlighted) {
                break;
            }
        }
    }

    if (isGridFilled() && !gotAWinner) {
        boxes.forEach((box) => {
            box.classList.add("draw");
        });

        updateScore("D");
        beginReset();
    }
}

function startInteraction(box) {
    box.addEventListener("mouseover", onMouseOver);
    box.addEventListener("mouseout", onMouseOut);
    box.addEventListener("click", onClick);
}

function stopInteraction(box) {
    box.removeEventListener("mouseover", onMouseOver);
    box.removeEventListener("mouseout", onMouseOut);
    box.removeEventListener("click", onClick);
}

function updateTurnText() {
    turnText.textContent = isPlayerTurn ? playerMark : cpuMark;

    if (turnText.textContent === "X") {
        turnText.classList.add("X");
        turnText.classList.remove("O");
    } else {
        turnText.classList.add("O");
        turnText.classList.remove("X");
    }
}

function updateScore(str) {
    if (str === "X") {
        XScore++;
        XScoreVal.textContent = XScore;
    } else if (str === "O") {
        OScore++;
        OScoreVal.textContent = OScore;
    } else if (str === "D") {
        draws++;
        drawVal.textContent = draws;
    }
}

function beginReset() {
    setTimeout(() => {
        reset();
    }, 1000);
}

function reset() {
    gotAWinner = false;

    if (wasPlayerLastTurn) {
        isPlayerTurn = false;
        wasPlayerLastTurn = false;
    } else {
        isPlayerTurn = true;
        wasPlayerLastTurn = true;
    }

    updateTurnText();

    boxes.forEach((box) => {
        box.textContent = "";
        startInteraction(box);

        box.classList.remove(`${playerMark}-win`);
        box.classList.remove(`${cpuMark}-win`);

        box.classList.remove(playerMark);
        box.classList.remove(cpuMark);

        box.classList.remove("draw");
    });

    callCpu();
}

function isGridFilled() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent === "") {
            return false;
        }
    }

    return true;
}

function callCpu() {
    setTimeout(() => {
        if (!isPlayerTurn && !gotAWinner) {
            goCpu();
        }
    }, 500);
}

function goCpu() {
    if (levelSelect.value === "Beginner") {
        beginner();
    } else if (levelSelect.value === "Intermediate") {
        intermediate();
    } else {
        advanced();
    }
}

function beginner() {
    let n;
    while (true) {
        n = Math.floor(Math.random() * 9);
        if (boxes[n].textContent == "") {
            boxes[n].textContent = cpuMark;
            boxes[n].classList.add(cpuMark);
            isPlayerTurn = true;
            updateTurnText();
            stopInteraction(boxes[n]);
            winCheck();
            break;
        }
        if (isGridFilled()) {
            break;
        }
    }
}

function intermediate() {
    let bestMove = findBestMove(boxes, true);

    boxes[bestMove].textContent = cpuMark;
    boxes[bestMove].classList.add(cpuMark);

    isPlayerTurn = true;

    updateTurnText();
    stopInteraction(boxes[bestMove]);

    winCheck();
}

function advanced() {
    let bestMove = findBestMove(boxes, false);

    boxes[bestMove].textContent = cpuMark;
    boxes[bestMove].classList.add(cpuMark);

    isPlayerTurn = true;

    updateTurnText();
    stopInteraction(boxes[bestMove]);

    winCheck();
}
