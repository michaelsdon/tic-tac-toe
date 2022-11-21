const gameBoard = (function() {
  let board = ['','','',
               '','','',
               '','',''];

  let turn = "X";

  function getopenPositionss() {
    let openPositions = [];

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        openPositions.push(i);
      }
    }

    return openPositions;
  }

  function freezeBoard() {
    for (let i = 0; i < board.length; i++) {
      const cell = document.getElementById(i.toString());
      cell.removeEventListener('click', move);
    }
  };

  function setWinner(winners) {
    for (element of winners) {
      const win = document.getElementById(element.toString());
      win.classList.add('win');
    }
    freezeBoard();
  };

  function checkWinner() {

    if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
      setWinner([0, 1, 2]);
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== '') {
      setWinner([3, 4, 5]);
    } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== '') {
      setWinner([6, 7, 8]);
    } else if (board[0] === board[3] && board[3] === board[6] && board[6] !== '') {
      setWinner([0, 3, 6]);
    } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== '') {
      setWinner([1, 4, 7]);
    } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== '') {
      setWinner([2, 5, 8]);
    } else if (board[0] === board[4] && board[4] === board[8] && board[8] !== '') {
      setWinner([0, 4, 8]);
    } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== '') {
      setWinner([2, 4, 6]);
    }
  };

  function isLegalMove(location) {
    if (board[location] !== "") {
      return false;
    } else {
      return true;
    }
  };

  function move(e) {
    const location = parseInt(e.target.id);
    if (isLegalMove(location)) {
      board[location] = turn;
    
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      };
      checkWinner();
    }

    render();
  };

  function restart(e) {
    for (let i = 0; i < board.length; i++) {
      const cell = document.getElementById(i.toString());
      cell.classList.remove('win');
      board[i] = '';
    }

    turn = "X";
    render();
  };

  function render() {
    for (let i = 0; i < board.length; i++) {
      let id = i.toString();
      let cellValue = board[i];

      const cell = document.getElementById(id);
      cell.addEventListener('click', move);

      if (cellValue !== '') {
        cell.textContent = board[i];
        cell.classList.add('inactive');
      } else {
        cell.textContent = '';
        cell.classList.remove('inactive');
      }
    }

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', restart);
  };

  render();

})();