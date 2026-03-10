let btnX = document.querySelector(".picker .buttons .X");
let btnO = document.querySelector(".picker .buttons .O");

let cpubtn = document.querySelector(".cpu-btn");
let playerMark = "X";

btnX.addEventListener("click", () => {
    btnX.classList.add("XO-btn-selected");
    btnX.classList.remove("XO-btn-unselected");

    btnO.classList.add("XO-btn-unselected");
    btnO.classList.remove("XO-btn-selected");

    playerMark = "X";
});

btnO.addEventListener("click", () => {
    btnO.classList.add("XO-btn-selected");
    btnO.classList.remove("XO-btn-unselected");

    btnX.classList.add("XO-btn-unselected");
    btnX.classList.remove("XO-btn-selected");

    playerMark = "O";
});

cpubtn.addEventListener("click", () => {
    localStorage.setItem("playerMark", playerMark);
});
