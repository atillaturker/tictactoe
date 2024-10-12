const gameBoard = [
    "","","",
    "","","",
    "","","",
]

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const cells = document.querySelectorAll(".cell");
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".reset");
const playerTurn = document.querySelector(".playerTurn")

let currentPlayer = "X";
let running = false;


const initializeGame = () => {
    cells.forEach((element,index) => {
        element.addEventListener("click",() => cellClicked(element,index))
    })
    running = true;
    restartBtn.addEventListener("click",() => restartGame())
}

const cellClicked = (element,index) => {
    if (gameBoard[index] !== "" || !running) {
        return; 
    }

    updateCell(element,index);
    checkWinner();

}

const updateCell = (element,index) => {
    gameBoard[index] = currentPlayer;
    element.textContent = currentPlayer;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurn.textContent = `${currentPlayer}'s Turn`;

}

const checkWinner = () => {
    let winner="";
    winCondition.forEach(condition => {
        const [a,b,c] = condition;
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
            running=false;
            winner = gameBoard[a];
        }
        
        winner ? 
            (running = false, result.textContent = `${winner} wins!`,playerTurn.textContent="") : 
            (!gameBoard.includes("") ? 
                (running = false, result.textContent = "Tie!",playerTurn.textContent="") : null);


    })

}

const restartGame = () => {
    gameBoard.fill("");
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    playerTurn.textContent=`${currentPlayer}'s Turn`;
    result.textContent="";
    running=true;
}



initializeGame();

