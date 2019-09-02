//variables
var scoreHuman = 0;
var scoreComputer = 0;
var moves = 0;
var playerFigure;
var computerFigure;
var currentPlayer = "human";
var gameFinished = false;
const scoreHumanText = document.getElementById("scoreHuman");
const scoreComputerText = document.getElementById("scoreComputer");
const scoreBoard = document.getElementById("scoreBoard");
const processText = document.querySelector(".gameProcess > p");
const symbolX = document.getElementById("X");
const symbolO = document.getElementById("O");

function start() {
	processText.innerHTML = "Choose the figure you wanna play with."
	$('.square').html('');
	moves = 0;
	$('.square').removeAttr('onClick');
}

function selectFigure(id) {
	if (id == "X") {
		playerFigure = id;
		computerFigure = "O";
		$('#X').removeAttr('onClick');
		$('#O').removeAttr('onClick');
	}
	else {
		playerFigure = id;
		computerFigure = "X";
		$('#O').removeAttr('onClick');
		$('#X').removeAttr('onClick');
	}

	symbolX.style.color = "gray";
	symbolO.style.color = "gray";

	$('.square').attr('onClick', 'makeMove(this.id)');
	processText.innerHTML = "Your figure is " + id + ". Let's start playing.";
}

function setCurrentPlayer(player) {
	currentPlayer = player;
}

function makeMove(id) {
	console.log("You clicked " + id);
	if (currentPlayer == "human") {
		$('#'+id).html(playerFigure);
		$('#'+id).removeAttr('onClick');
		gameStatus();
		if(gameFinished) {
			return;
		}
		currentPlayer = "computer";		
	}
	else if (currentPlayer == "computer") {
		$('#'+id).html(computerFigure);
		$('#'+id).removeAttr('onClick');
		gameStatus();
		if(gameFinished) {
			return;
		}
		currentPlayer = "human";		
	}
	
	moves++;
	drawCheck();

	if (currentPlayer == "computer") {
		computerMove();
	}
}

function gameStatus() {
  var curPlayer;

  if (currentPlayer == 'human') {
    curPlayer = playerFigure;
  } 
  else if (currentPlayer == 'computer') {
    curPlayer = computerFigure;
  }

  switch (true) {
    case $('#s11').html() === curPlayer && $('#s12').html() === curPlayer && $('#s13').html() === curPlayer:
      finishGame(curPlayer);
      break;
    case $('#s21').html() === curPlayer && $('#s22').html() === curPlayer && $('#s23').html() === curPlayer:
      finishGame(curPlayer);
      break;
    case $('#s31').html() === curPlayer && $('#s32').html() === curPlayer && $('#s33').html() === curPlayer:
      finishGame(curPlayer);
      break;
    case $('#s11').html() === curPlayer && $('#s21').html() === curPlayer && $('#s31').html() === curPlayer:
      finishGame(curPlayer);
      break;
    case $('#s12').html() === curPlayer && $('#s22').html() === curPlayer && $('#s32').html() === curPlayer:
      finishGame(curPlayer);
      break;
    case $('#s13').html() === curPlayer && $('#s23').html() === curPlayer && $('#s33').html() === curPlayer:
      finishGame(curPlayer);
      break;
    case $('#s11').html() === curPlayer && $('#s22').html() === curPlayer && $('#s33').html() === curPlayer:
      finishGame(curPlayer);
      break;
    case $('#s13').html() === curPlayer && $('#s22').html() === curPlayer && $('#s31').html() === curPlayer:
      finishGame(curPlayer);
      break;
    default:
      drawCheck();
  }
}

function drawCheck() {
  if (moves === 9) {
    processText.innerHTML = "It's a draw!";
    setTimeout(finishGame, 1000);
  }
}

function resetBoard() {
	gameFinished = false;
	currentPlayer = 'human';
	$('.square').html('');
	moves = 0;
	$('.square').attr('onClick', 'makeMove(this.id)');
	processText.innerHTML = "Your figure is " + playerFigure + ". Let's start playing.";
	setTimeout(200);

}

function finishGame(curPlayerFigure) {
  lockBoard();
  if (moves !== 9) {
  	processText.innerHTML =  curPlayerFigure + " has won the game.";  	
  }

  //update scores
  if (curPlayerFigure == playerFigure) {
  	scoreHuman++;
  	scoreHumanText.innerHTML = scoreHuman;
  }
  else if (curPlayerFigure == computerFigure) {
  	scoreComputer++;
  	scoreComputerText.innerHTML = scoreComputer;
  }

  gameFinished = true;
  setTimeout(resetBoard, 1500);
}

function resetGame() {
	resetBoard();
	symbolX.style.color = "black";
	symbolO.style.color = "black";
	$('#X').attr('onClick', 'selectFigure("X")');
	$('#O').attr('onClick', 'selectFigure("O")');
	scoreHuman = 0;
	scoreComputer = 0;
	scoreComputerText.innerHTML = scoreComputer;
	scoreHumanText.innerHTML = scoreHuman;
	start();
}

function lockBoard() {
  $('.square').removeAttr('onClick');
}

function computerMove() {
  switch (true) {
    case $('#s11').html() == "":
      makeMove('s11');
      break;
    case $('#s12').html() == "":
      makeMove('s12');
      break;
    case $('#s13').html() == "":
      makeMove('s13');
      break;
    case $('#s21').html() == "":
      makeMove('s21');
      break;
    case $('#s22').html() == "":
      makeMove('s22');
      break;
    case $('#s23').html() == "":
      makeMove('s23');
      break;
    case $('#s31').html() == "":
      makeMove('s31');
      break;
    case $('#s32').html() == "":
      makeMove('s32');
      break;
    case $('#s33').html() == "":
      makeMove('s33');
      break;
  }
}

start();