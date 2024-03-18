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
    const currentGameBoard = Array(9).fill("");

    function getGameBoard() {
        console.log(currentGameBoard);
    };

    function createNewBoard() {
        currentGameBoard.fill("");
    };

    function placeSymbol(boardLocation, player) {
        currentGameBoard.splice(boardLocation, 1, player.getSymbol());
    };

    function isSquareEmpty(placementLocation) {
        return (currentGameBoard[placementLocation] == '');
    };


    return {createNewBoard, placeSymbol, isSquareEmpty, getGameBoard};
})();

const turnTracker = function() {
    const boardSize = 9;
    function startGame() {
        for(let i = 0; i < boardSize; i++) {
            if (i % 2 == 0) {
                // Player1
                currentTurn(player1);
            }
            else {
                // Player2
                currentTurn(player2);
            }
        }
    }
    return {startGame};
};

const currentTurn = function(player) {
    let placementLocation = parseInt(prompt(player.getName() + ' Where would you like to place your: ' + player.getSymbol()));
    if (!gameBoard.isSquareEmpty(placementLocation)) {
        do {
            placementLocation = parseInt(prompt(player.getName() + ' That square is taken. Please choose another location '));
        }
        while (!gameBoard.isSquareEmpty(placementLocation));
    }
    
    gameBoard.placeSymbol(placementLocation, player);
};



const player1 = player('Josh', 'x');
const player2 = player('Drake', 'o');

turnTracker().startGame();
