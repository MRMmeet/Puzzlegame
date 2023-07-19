let moves = 0;
let seconds = 0;
let timerInterval;
const historyData = [];
function startGame() {
  const rows = parseInt(document.getElementById('rows').value);
  const columns = parseInt(document.getElementById('columns').value);
  const gameBoard = document.getElementById('gameBoard');
  
  gameBoard.style.setProperty('--rows', rows);
  gameBoard.style.setProperty('--columns', columns);
  gameBoard.style.setProperty('background-color', 'green');
  
  gameBoard.innerHTML = '';
  
  const totalTiles = rows * columns;
  const numbers = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
  numbers.push('');
  const CheckNum = numbers;


  startTimer();
  
  shuffleArray(numbers);
  
  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = numbers[i];
    tile.addEventListener('click', () => moveTile(tile));//calling movetile function after clicking
    gameBoard.appendChild(tile); //adding tile inside the gameBoard
  }
}

function moveTile(tile) {
  const gameBoard = document.getElementById('gameBoard');
  const emptyTile = gameBoard.querySelector('.tile:empty');

    // Save the move to history data
  const moveData = {
    move: moves,
    time: seconds
  };
  historyData.push(moveData);

  
  if (isAdjacent(tile, emptyTile)) {

    checkWin();
    const tileText = tile.textContent;
    const emptyTileText = emptyTile.textContent;
    
    tile.textContent = emptyTileText;
    emptyTile.textContent = tileText;
    
    tile.classList.toggle('empty');
    emptyTile.classList.toggle('empty');
  }

    updateCounter(++moves);
  
}

function updateCounter(count) {
  const counter = document.getElementById('counter');
  counter.textContent = `Moves: ${count}`;


}
function startTimer() {
  const timer = document.getElementById('timer');
  timerInterval = setInterval(() => {
    seconds++;
    timer.textContent = `Time: ${seconds}s`;
    var time = timer;
    checkWin(time);

  }, 1000);
}

function stopTimer(time) {
  clearInterval(timerInterval);
  document.write(time);

}

function isAdjacent(tile1, tile2) {
  const gameBoard = document.getElementById('gameBoard');
  const tiles = Array.from(gameBoard.getElementsByClassName('tile'));
  
  const tile1Index = tiles.indexOf(tile1);
  const tile2Index = tiles.indexOf(tile2);
  
  const columns = parseInt(gameBoard.style.getPropertyValue('--columns'));
  
  return (
    (Math.abs(tile1Index - tile2Index) === 1 && Math.floor(tile1Index / columns) === Math.floor(tile2Index / columns)) ||
    Math.abs(tile1Index - tile2Index) === columns
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkWin(time) {
  const tiles = Array.from(document.getElementsByClassName('tile'));
  const values = tiles.map(tile => tile.textContent);
  const isSorted = values.slice(0, -1).every((value, index) => value === (index + 1).toString());
  const isEmptyTileLast = values[values.length - 1] === '';


  if (isSorted && isEmptyTileLast) {
    stopTimer(time);
    
    alert(`Congratulations! You solved the puzzle in ${moves} moves and ${seconds} seconds.`);

        historyData.forEach(data => {
      const listItem = document.createElement('li');
      listItem.textContent = `Move ${data.move} - Time: ${data.time}s`;
      historyList.appendChild(listItem);
    });

  }
 
}