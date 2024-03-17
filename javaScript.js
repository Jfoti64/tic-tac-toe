function player(name, symbol) {
    function getName() {
        console.log(name);
    };

    function getSymbol() {
        console.log(symbol);
    };

    function placeSymbol(boardLocation) {
        gameBoard.splice(boardLocation, 1, symbol);
    };

    return {getName, getSymbol, placeSymbol};
};

function gameState() {
    function getGameState() {
        console.log(gameBoard);
    };

    return {getGameState};
};


const changeGameState = (function () {
    // Start the array off blank
    const gameBoard = Array(9).fill("");

    function createNewBoard() {
        gameBoard.fill("");
    };

    return {createNewBoard};
})();

const player1 = player('Josh', 'x');
const player2 = player('Drake', 'o');

