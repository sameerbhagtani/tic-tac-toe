function findBestMove(boxes, isInter) {
    let grid = [];
    for (let i = 0; i < boxes.length; i++) {
        grid[i] = boxes[i].textContent;
    }
    // Converting into a 1D array in the above lines.

    let bestVal = -1000;
    let bestMove = -1; // this denotes the grid cell

    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === "") {
            grid[i] = cpuMark;

            let moveVal = minimax(grid, 0, false, isInter);

            grid[i] = "";

            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
}

function minimax(grid, depth, isCpuTurn, isInter) {
    let maxDepth = 2;
    let score = evaluate(grid);

    if (score === 10) {
        return score;
    }

    if (score === -10) {
        return score;
    }

    if (!areMovesLeft(grid)) {
        return 0;
    }

    if (isInter && depth >= maxDepth) {
        return evaluate(grid);
    }

    if (isCpuTurn) {
        let best = -1000;

        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === "") {
                grid[i] = cpuMark;

                best = Math.max(
                    best,
                    minimax(grid, depth + 1, !isCpuTurn, isInter)
                );

                grid[i] = "";
            }
        }
        return best;
    } else {
        let best = 1000;

        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === "") {
                grid[i] = playerMark;

                best = Math.min(
                    best,
                    minimax(grid, depth + 1, !isCpuTurn, isInter)
                );

                grid[i] = "";
            }
        }
        return best;
    }
}

function evaluate(grid) {
    for (i of winStates) {
        if (
            grid[i[0]] != "" &&
            grid[i[0]] === grid[i[1]] &&
            grid[i[1]] === grid[i[2]]
        ) {
            if (grid[i[0]] === cpuMark) {
                return 10;
            } else {
                return -10;
            }
        }
    }

    return 0;
}

function areMovesLeft(grid) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === "") {
            return true;
        }
    }

    return false;
}
