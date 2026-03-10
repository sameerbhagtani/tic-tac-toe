let boxes = document.querySelectorAll(".grid button");
let turnText = document.querySelector(".turn-text");
let resetbtn = document.querySelector(".btn-reset");

let isXTurn = true;
let wasXlastTurn = true;

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

    if (isXTurn) {
        box.textContent = "X";
        box.classList.add("X-ready");
    } else {
        box.textContent = "O";
        box.classList.add("O-ready");
    }
};

const onMouseOut = (event) => {
    let box = event.target;

    if (isXTurn) {
        box.classList.remove("X-ready");
    } else {
        box.classList.remove("O-ready");
    }

    box.textContent = "";
};

const onClick = (event) => {
    let box = event.target;

    if (isXTurn) {
        box.textContent = "X";
        box.classList.add("X");
        box.classList.remove("X-ready");

        isXTurn = false;
        updateTurnText();
    } else {
        box.textContent = "O";
        box.classList.add("O");
        box.classList.remove("O-ready");

        isXTurn = true;
        updateTurnText();
    }

    stopInteraction(box);

    winCheck();
};

/* ========================================================================= */

boxes.forEach((box) => {
    startInteraction(box);
});

resetbtn.addEventListener("click", () => {
    wasXlastTurn = !wasXlastTurn; //flipping this value to preserve the first player in the resetted game

    reset();
});

/* ========================================================================= */

function winCheck() {
    let highlighted = false;

    for (i of winStates) {
        if (boxes[i[0]].textContent != "" && boxes[i[0]].textContent === boxes[i[1]].textContent && boxes[i[1]].textContent === boxes[i[2]].textContent) {
            if (!isXTurn) {
                gotAWinner = true;
                updateScore("X");

                for (let j = 0; j <= 2; j++) {
                    boxes[i[j]].classList.add("X-win");
                    highlighted = true;
                }
            } else {
                gotAWinner = true;
                updateScore("O");

                for (let j = 0; j <= 2; j++) {
                    boxes[i[j]].classList.add("O-win");
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
    turnText.textContent = isXTurn ? "X" : "O";

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

    if (wasXlastTurn) {
        isXTurn = false;
        wasXlastTurn = false;
    } else {
        isXTurn = true;
        wasXlastTurn = true;
    }

    updateTurnText();

    boxes.forEach((box) => {
        box.textContent = "";
        startInteraction(box);

        box.classList.remove("X-win");
        box.classList.remove("O-win");

        box.classList.remove("X");
        box.classList.remove("O");

        box.classList.remove("draw");
    });
}

function isGridFilled() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent === "") {
            return false;
        }
    }

    return true;
}
