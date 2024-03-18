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


    return {createNewBoard, placeSymbol, isSquareEmpty, getGameBoard, getBoardColAndRowNum};
})();

const turnTracker = function() {
    const totalCells = gameBoard.getBoardColAndRowNum() * gameBoard.getBoardColAndRowNum();
    function startGame() {
        for(let i = 0; i < totalCells; i++) {
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
    let translatedPlacement; // Define the variable outside the loop
    do {
        placementLocation = parseInt(prompt(player.getName() + ' Where would you like to place your: ' + player.getSymbol()));
        translatedPlacement = translateDimensions(placementLocation); // Update its value inside the loop
        if (isNaN(placementLocation)) {
            alert('Please enter a valid number.');
            continue; // Restart the loop
        }
        if (!gameBoard.isSquareEmpty(translatedPlacement.row, translatedPlacement.col)) {
            alert('That square is taken. Please choose another location.');
        }
    } while (!gameBoard.isSquareEmpty(translatedPlacement.row, translatedPlacement.col) || isNaN(placementLocation));
    
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

    // Check rows
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





const player1 = player('Josh', 'x');
const player2 = player('Drake', 'o');

turnTracker().startGame();
