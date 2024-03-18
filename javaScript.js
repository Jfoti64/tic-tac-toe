function player(name, symbol) {
    function getName() {
        return name;
    };

    function getSymbol() {
        return symbol;
    };

    return {getName, getSymbol};
};

const gameBoard = (function () {
    // Start the array off blank
    const currentGameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function getTotalCells() {
        return getBoardColAndRowNum() * getBoardColAndRowNum();
    };

    function getGameBoard() {
        return currentGameBoard;
    };

    function getBoardColAndRowNum() {
        return currentGameBoard.length;
    }
    

    function createNewBoard() {
        currentGameBoard.fill("");
    };

    function placeSymbol(boardLocation, player) {
        currentGameBoard[boardLocation.row][boardLocation.col] = player.getSymbol();
    };

    function isSquareEmpty(row, col) {
        return currentGameBoard[row][col] === '';
    }


    return {createNewBoard, placeSymbol, isSquareEmpty, getGameBoard, getBoardColAndRowNum, getTotalCells};
})();

const turnTracker = function() {
    function startGame() {
        for(let i = 0; i < gameBoard.getTotalCells(); i++) {
            if (i % 2 == 0) {
                // Player1
                currentTurn(player1);
                if (checkIfWinner(player1)) {
                    endGame(player1);
                    break;
                }
            }
            else {
                // Player2
                currentTurn(player2);
                if (checkIfWinner(player2)) {
                    endGame(player2);
                    break;
                }
            }
        }
    }
    function endGame(player) {
        console.log(player.getName() + ' Wins!');
    };
    return {startGame, endGame};
};

const currentTurn = function(player) {
    function getCurrentPlayer() {
        return player;
    };

    let placementLocation;
    let translatedPlacement;
    let input;
    do {
        input = prompt(player.getName() + ' Where would you like to place your: ' + player.getSymbol());
        placementLocation = parseInt(input);
        if (isNaN(placementLocation) || placementLocation >= gameBoard.getTotalCells() || placementLocation < 0) {
            if (placementLocation != 0) {
                alert('Please enter a valid number between 0 and ' + (gameBoard.getTotalCells() - 1));
                continue; // Restart the loop
            }
        }        
        translatedPlacement = translateDimensions(placementLocation);
        if (!gameBoard.isSquareEmpty(translatedPlacement.row, translatedPlacement.col)) {
            alert('That square is taken. Please choose another location.');
        }
    } while (!translatedPlacement || !gameBoard.isSquareEmpty(translatedPlacement.row, translatedPlacement.col));


    
    gameBoard.placeSymbol(translatedPlacement, player);

    return {getCurrentPlayer};
};




const translateDimensions = function(oneDimensionalIn) {
    // Get the length of one side of the square grid (number of rows or columns)
    const numCols = gameBoard.getBoardColAndRowNum();
    
    // Calculate the row and column positions from the one-dimensional input
    const rowPosition = Math.floor(oneDimensionalIn / numCols);
    const colPosition = oneDimensionalIn % numCols;

    // Return the translated row and column positions as an object
    return { row: rowPosition, col: colPosition };
};

const checkIfWinner = function(player) {
    const boardState = gameBoard.getGameBoard();

    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i][0] !== '' && boardState[i][0] === boardState[i][1] && boardState[i][1] === boardState[i][2]) {
            return true;
        }
        if (boardState[0][i] !== '' && boardState[0][i] === boardState[1][i] && boardState[1][i] === boardState[2][i]) {
            return true;
        }
        if (boardState[0][0] !== '' && boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2]) {
            return true;
        }
        if (boardState[2][0] !== '' && boardState[2][0] === boardState[1][1] && boardState[1][1] === boardState[0][2]) {
            return true;
        }
    }
};

const populateGameBoardElements = (function() {
    // Create one div per cell.
    for (let i = 0; i < gameBoard.getBoardColAndRowNum(); i++) {
        for (let n = 0; n < gameBoard.getBoardColAndRowNum(); n++) {
            const gameBoardCell = document.createElement("div");
            gameBoardCell.classList.add("cell");
            gameBoardCell.setAttribute("data-index", i.toString() + "-" + n.toString());
            document.getElementById('gameBoard').appendChild(gameBoardCell);
        }
    }
})();






const player1 = player('Josh', 'x');
const player2 = player('Drake', 'o');

//turnTracker().startGame();