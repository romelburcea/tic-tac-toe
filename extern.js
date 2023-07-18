///////////buttons///////////////
const startButton = document.querySelector("#startGame")
startButton.addEventListener("click", () => {
    game.start()
})

const restartButton = document.querySelector("#restartGame")
restartButton.addEventListener("click", () => {
    game.restart()
})
/////////////////////////////////


const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message
    }

    return {
        renderMessage
    }
})()


const table = (() => {
    let tictactoe = ["", "", "", "", "", "", "", "", "",]
    const display = () => {
        let board = ""
        tictactoe.forEach((square, index) => {
            board += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#table").innerHTML = board
        const squares = document.querySelectorAll(".square")
        squares.forEach((square) => {
            square.addEventListener("click", game.handler)
        })
    }
    const update = (index, value) => {
        tictactoe[index] = value
        display()
    } 


    const getGameboard = () => tictactoe

    return{
        display,
        update,
        getGameboard
    }
})()

const createPlayers = (name, mark) => {
    return{
        name, mark
    }
}

const game = (() => {
    let players = []
    let playerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayers(document.querySelector("#player1").value, "X"),
            createPlayers(document.querySelector("#player2").value, "O")
        ]

        playerIndex = 0;
        gameOver = false;
        table.display()
        const squares = document.querySelectorAll(".square")
        squares.forEach((square) => {
            square.addEventListener("click", handler)
        })
    }

    const handler = (event) => {
        if(gameOver) {
            return;
        }
        let index = parseInt(event.target.id.split("-")[1])
        if(table.getGameboard()[index] !== ""){
            return
        }
        table.update(index, players[playerIndex].mark)

        if(checkForWin(table.getGameboard(), players[playerIndex].mark)){
            gameOver = true;
            displayController.renderMessage(`${players[playerIndex].name} wins!`)
        } else if(checkForTie(table.getGameboard())) {
            gameOver = true;
            displayController.renderMessage(`It's a tie!`)
        }

        playerIndex = playerIndex === 0 ? 1 : 0
    }

    const restart = () =>{
        for (let i = 0; i < 9; i++){
            table.update(i, "")
        }

        table.display()
        gameOver = false;
        document.querySelector("#message").innerHTML = "";
    }

    return{
        start,
        restart,
        handler
    }
})()

function checkForTie(board) {
    return board.every(cell => cell !== "")
}

function checkForWin(board){
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i = 0 ; i < winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i]
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }

    return false;
}




