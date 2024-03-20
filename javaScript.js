document.addEventListener('DOMContentLoaded', function() {
    function player(name, symbol) {
        function getName() {
            return name;
        };

        function getSymbol() {
            return symbol;
        };

        function getPlayer() {
            return player;
        }

        return {getName, getSymbol, getPlayer};
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
        };

        return {createNewBoard, placeSymbol, isSquareEmpty, getGameBoard, getBoardColAndRowNum, getTotalCells};
    })();

    const turnStatus = (function() {
        let turnNum = 1;
        let currentPlayer;
        function takeTurn(boardLocation) {
            if (turnNum % 2 == 1) {
                turnNum++;
                currentPlayer = player1;
                gameBoard.placeSymbol(boardLocation, player1);
                if (checkIfWinner(player1)) {
                    endGameWin(player1);
                }
                else if (turnNum > gameBoard.getTotalCells()) {
                    endGameTie();
                }
            } else {
                turnNum++;
                currentPlayer = player2;
                gameBoard.placeSymbol(boardLocation, player2);
                if (checkIfWinner(player2)) {
                    endGameWin(player2);
                }
                else if (turnNum > gameBoard.getTotalCells()) {
                    endGameTie();
                }
            }
        }
    
        function getCurrentPlayer() {
            return currentPlayer;
        }
    
        function endGameWin(player) {
            document.getElementById('results').innerHTML  = player.getName() + ' WINS!';
            clickCells().disableClickListeners();
        };

        function endGameTie() {
            document.getElementById('results').innerHTML  = 'TIE!';
            clickCells().disableClickListeners();
        };
        
        // Return an object with getCurrentPlayer method
        return { endGameWin, getCurrentPlayer, takeTurn };
    })();
    

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

    const clickCells = function() {
        const cells = document.getElementsByClassName('cell');

        const addCellClickEvents = function() {
            for (let cell of cells) {
                cell.addEventListener('click', handleClick);
            }
        };
        
        function handleClick(event) {
            console.log('clicked');
            const clickedCell = event.target;
            const dataIndex = clickedCell.getAttribute('data-index');
            const boardLocation = {
                row: parseInt(dataIndex[0]),
                col: parseInt(dataIndex[2]),
            };
            turnStatus.takeTurn(boardLocation);
            clickedCell.innerHTML = turnStatus.getCurrentPlayer().getSymbol();
            // Remove the click event listener after clicking
            clickedCell.removeEventListener('click', handleClick);
        };

        function disableClickListeners() {
            const cells = document.getElementsByClassName('cell');
            for (let cell of cells) {
                cell.classList.add('disabled');
            }
        }        
        return {disableClickListeners, addCellClickEvents};
    };

    const clickResetBtn = (function() {
        resetBtn = document.getElementById('restart');

        resetBtn.addEventListener('click', () => {
            location.reload();
        });
    })();

    function handlePlayerSubmission(event) {
        let player1Name = document.getElementById('player1').value;
        let player2Name = document.getElementById('player2').value;
    
        if (player1Name == '' || player2Name == '') {
            alert('Enter a name for each player');
        }
        else {
            event.preventDefault();

            document.getElementById('results').innerHTML = 'Play';
    
            player1 = player(player1Name, 'x');
            player2 = player(player2Name, 'o');
            clickCells().addCellClickEvents();
    
            // Remove the event listener after it's been executed
            document.getElementById("start").removeEventListener("click", handlePlayerSubmission);
        }
    }

    const addPlayerEventListener = (function() {
        document.getElementById("start").addEventListener("click", handlePlayerSubmission);
    })();
    
});