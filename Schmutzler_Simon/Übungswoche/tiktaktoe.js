let board = ['', '', '', '', '', '', '', '', '']
let activePlayer = 'X';
let activeGame = true;

function clickHandler(index) {
    if (board[index] === '' && activeGame) {
        board[index] = activePlayer;


        document.getElementById("board").children[index].innerText = activePlayer;
        checkWinCon();
        togglePlayer();
    }


}

function togglePlayer() {
    activePlayer = activePlayer === 'X' ? 'O' : 'X';


}

function checkWinCon() {
    const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {  
            activeGame = false;
            alert(`${activePlayer} wins!`);
            document.getElementById("board").children[a].style = "background-color: red";
            document.getElementById("board").children[b].style = "background-color: red";
            document.getElementById("board").children[c].style = "background-color: red";
            
            return;
        }
    }

    if (!board.includes('')) {
        alert("It is a draw!");
        activeGame = false;
    }
} 