
let board = ['','','','','','','','','']
let currentPlayer = 'X'
let gameActive = true

const squares = document.querySelectorAll('.cell')
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartGame')
const backBtn = document.getElementById('back')
const PlayWithHuman = document.getElementById('humanPlayer')
const gameSection = document.getElementsByClassName('game-section')[0]
const startGameMenu = document.getElementsByClassName('menu')[0]


gameSection.style.display = "none"

PlayWithHuman.addEventListener('click', () => {
  gameActive = true
  gameSection.style.display = 'block'
  startGameMenu.style.display = 'none'

  humanclick();
})




backBtn.addEventListener('click', () => {
  gameSection.style.display = 'none'
  startGameMenu.style.display = 'block'
})

const winningsCobinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function humanclick(){
  restartButton.addEventListener('click', () => {
    resetGame()
  })

squares.forEach((square) => {
  square.addEventListener('click', (e) => {
    getSquaresClicks(e.target);
  })
})

function getSquaresClicks(cell){
const cellIndex = parseInt(cell.id)
console.log(cellIndex);

if (board[cellIndex] === '' && gameActive) {
  board[cellIndex] = currentPlayer
  cell.textContent = currentPlayer
  checkWinner()
  swapPlayers()
}
}

}
function computerSelect(){
  let movesAvailable = [];

  for(let i =0; i < board.length; i++) {
    if(board[i] === ''){
      movesAvailable.push(i)
    }
  }

  const randomMove = movesAvailable[Math.floor(Math.random() * movesAvailable.length)]

  board[randomMove] = 'O'
  squares[randomMove].textContent = 'O';

  checkWinner();
  if(gameActive){
    swapPlayers();
  }
}

function swapPlayers(){
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

function checkWinner(){
  for(let combination of winningsCobinations){
    const [a,b,c] = combination
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      gameActive = false
      messageElement.textContent = `${currentPlayer} wins!`;
      return;
  }

  if (!board.includes('')) {
    gameActive = false;
    messageElement.textContent = 'It\'s a draw!';
}
}
}

function resetGame(){
  board = ['', '', '', '', '', '', '', '', '']
  gameActive = true
  currentPlayer = 'X'
  squares.forEach((square) => {
    square.textContent = ''
  })

}

const computerBtn = document.getElementById('computer')

computerBtn.addEventListener('click', () =>{
  gameActive = true
  gameSection.style.display = 'block'
  startGameMenu.style.display = 'none'

  restartButton.addEventListener('click', () => {
    resetGame()
  })

squares.forEach((square) => {
  square.addEventListener('click', (e) => {
    if(gameActive && currentPlayer === 'X'){
      getSquaresClicks(e.target);
    }
   
  })
})

function getSquaresClicks(cell){
const cellIndex = parseInt(cell.id)
console.log(cellIndex);

if (board[cellIndex] === '' && gameActive) {
  board[cellIndex] = currentPlayer
  cell.textContent = currentPlayer
  checkWinner()
  if(gameActive){
    swapPlayers()
    setTimeout(computerSelect,600);
  }
 
}
}

})
