//ACCESS DOM ELEMENT ---------------------------------------------------------

//CSRF token
const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');

//all buttons for joining a new room (either random room or private room with a friend)
//NOTE: not included buttons in the form
const joinNewRoomButtonElements =
  document.querySelectorAll(".join-new-room-btn");

//game config for choosing the name
const gameConfigSectionElement = document.getElementById("game-config");

//form
const formElement = document.querySelector("#game-config form");

//form error message
const formErrorMessageElement = document.querySelector(
  "#game-config .form-error-message"
);

//active game board
const activeGameSectionElement = document.getElementById("active-game");

//game over status
const gameOverStatusElement = document.getElementById("game-over");

//game over play again button
const playAgainButtonElement = document.getElementById("play-again-btn");

//div containing active game buttons
const activeGameButtonsElement = document.getElementById("active-game-buttons");

//players name
const playerNameElement1 = document.getElementById("player1");
const playerNameElement2 = document.getElementById("player2");

//game board
const gameBoardElement = document.getElementById("game-board");

//game board cells
const gameBoardLiElements = document.querySelectorAll("#game-board li");

//game error message
const gameErrorMessageElement = document.querySelector(
  "#active-game .game-error-message"
);

//game turn info
const gameTurnInfo = document.getElementById("game-turn");

//name of the player who has his turn
const activePlayerNameElement = document.getElementById("active-player-name");

//GLOBAL FLAGS---------------------------------------------------------
let isMyTurnGlobal = false;

let playerNameGlobal = "";

//PERIODIC REQUEST CONFIG OBJECTS ---------------------------------------------------------
//synchronization period [ms]
const syncTime = 2000;

//ask the server if another player connected to the room and fetch the data of that player in that case
const getOnePlayerDataConfig = new PeriodicRequestConfig(
  fetchOnePlayerData, //send
  syncTime, // delay [ms]
  false, //stop
  setOtherPlayerData, //resolve
  displayGameErrorMessage //handeError
);

//ask the server if the other player made his move and fetch actual room status in that case
const fetchRoomDataConfig = new PeriodicRequestConfig(
  fetchRoomData, //send
  syncTime, // delay [ms]
  false, //stop
  startYourTurn, //resolve
  displayGameErrorMessage //handeError
);

//EVENT LISTENERS ---------------------------------------------------------

//either join a random room or private room with a friend (form buttons not included)
for (const buttonElement of joinNewRoomButtonElements) {
  buttonElement.addEventListener("click", joinNewRoom);
}

//for submission for joining a new room
formElement.addEventListener("submit", joinNewRoom);

//play again with the other player after game over
playAgainButtonElement.addEventListener("click", playAgain);

//hide game error message by clicking on the "X" button
gameErrorMessageElement
  .querySelector("button")
  .addEventListener("click", hideGameErrorMessage);

//make a game move
gameBoardElement.addEventListener("click", makeGameMove);

//DEBUGGING  ---------------------------------------------------------
//...
