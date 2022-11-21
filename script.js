Player = function(sign) {
  this.sign = sign;

  function getSign() {
    return sign;
  }

  return {getSign}
};

Board = (function() {

  board = ['', '', '', '', '', '', '', '', '']
  
  function getBoard() {
    return board;
  };

  function updateBoard(index, sign) {
    board[index] = sign;
  };

  function restartBoard() {
    board = ['', '', '', '', '', '', '', '', '']
  };

  return {getBoard, updateBoard, restartBoard};
})();

Display = (function() {

  const header = document.getElementById('game-header');
  const cells = document.querySelectorAll('.cell');
  const restartBtn = document.getElementById('restart');

  cells.forEach((cell) => {
    cell.addEventListener('click', playRound);
  })

  restartBtn.addEventListener('click', restart);

  function playRound(e) {
    Game.playRound(e);
  }

  function restart(e) {
    Game.restart();
    cells.forEach((cell) => {
      cell.classList.remove('win');
    })
  }

  function updateMessage(message) {
    header.textContent = message;
  }

  function updateBoard() {
    const board = Board.getBoard();
    for (let i = 0; i < board.length; i++) {
      const cell = document.getElementById(i.toString());
      cell.textContent = board[i];
    }
  }
  
  function setWinner(a, b, c) {
    const aCell = document.getElementById(a.toString()); 
    const bCell = document.getElementById(b.toString()); 
    const cCell = document.getElementById(c.toString());
    
    aCell.classList.add('win');
    bCell.classList.add('win');
    cCell.classList.add('win');
  }

  return {updateMessage, updateBoard, setWinner}
})();

Game = (function() {
  xPlayer = Player('X');
  oPlayer = Player('O');
  round = 0;
  gameOver = false;
  winner = null;

  function playRound(e) {
    const id = parseInt(e.target.id);
    if (checkLegalMove(id) && !gameOver) {
      const player = getPlayerTurn()
      const playerSign = player.getSign();
      round += 1;

      Board.updateBoard(id, playerSign);
      Display.updateBoard();

      if (checkWinner() || winner !== null) {
        winner = player;
        gameOver = true;
        Display.updateMessage(`Player ${winner.getSign()} Wins`)
      } else if (round > 8) {
        Display.updateMessage('It\'s a Draw!');
      } else {
        const newPlayerSign = getPlayerTurn().getSign();
        Display.updateMessage(`Player ${newPlayerSign}'s Turn`);
      };
      
    };

  };

  function checkWinner() {
    if (allEqual(0, 1, 2)){
      return true;
    } else if (allEqual(3, 4, 5)) {
      return true;
    } else if (allEqual(6, 7, 8)) {
      return true;
    } else if (allEqual(0, 3, 6)) {
      return true;
    } else if (allEqual(1, 4, 7)) {
      return true;
    } else if (allEqual(2, 5, 8)) {
      return true;
    } else if (allEqual(0, 4, 8)) {
      return true;
    } else if (allEqual(2, 4, 6)) {
      return true;
    }
    return false;
  }

  function allEqual(a, b, c) {
    const board = Board.getBoard();
    if (board[a] === board[b] && board[b] === board[c] && board[c] !== '') {
      Display.setWinner(a, b, c);
      return true;
    }
    return false
  }

  function getPlayerTurn() {
    if (round % 2 === 0) {
      return xPlayer;
    } else {
      return oPlayer;
    }
  }

  function restart() {
    Board.restartBoard();
    Display.updateBoard();
    round = 0;
    gameOver = false;
    winner = null;
    Display.updateMessage(`Player ${getPlayerTurn().getSign()}'s Turn`)
  };

  function checkLegalMove(index) {
    const board = Board.getBoard();
    if (board[index] !== '') {
      return false;
    } else {
      return true;
    }
  };

  Display.updateMessage(`Player ${getPlayerTurn().getSign()}'s Turn`)

  return {playRound, restart}
})();
