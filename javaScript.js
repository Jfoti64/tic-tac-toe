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

    function createNewBoard() {
        currentGameBoard.fill("");
    };

    function placeSymbol(boardLocation, player) {
        currentGameBoard.splice(boardLocation, 1, player.getSymbol());
    };

    function getGameState() {
        console.log(currentGameBoard);
    };


    return {createNewBoard, placeSymbol, getGameState};
})();

const player1 = player('Josh', 'x');
const player2 = player('Drake', 'o');

gameBoard.placeSymbol(0, player1);
