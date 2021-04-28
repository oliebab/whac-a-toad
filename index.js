const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const chrono = document.getElementById("chrono");
const score = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

let timeRemaining = 10;
let defaultScore = 0;
let gameIsOn = true;

// Select a random hole for the mole to pop up, using a random index
function randomHole() {
  const holeIndex = Math.floor(Math.random() * 9);
  const selectedHole = holes[holeIndex];
  return selectedHole;
}

// Select a random mole (Toad, Coin or Bomb) that pops up in the selected hole

function randomMole() {

  // const holeIndex = Math.floor(Math.random() * 9);
  // const currentHole = holes[holeIndex];
  const currentHole = randomHole(holes);
  console.log(currentHole);

  const moleIndex = Math.floor(Math.random() * 3);
  let getToad = currentHole.querySelector(".toad");
  let getBomb = currentHole.querySelector(".bomb");
  let getCoin = currentHole.querySelector(".coin");
  let possibilitiesArray = [getToad, getBomb, getCoin];
  let currentMole = possibilitiesArray[moleIndex];
  
  console.log("coucou", currentMole);
  // let randomizer = currentHole.currentMole
  // console.log(randomizer);
  return currentMole;
}

// Set a random timer for the mole to pop up
function randomPeepTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Get the mole to pop up from the selected hole

function molePeeps() {
  const timer = randomPeepTime(400, 900);
  console.log(timer);
  // const currentHole = randomHole(holes);
  const currentMole = randomMole();
  // console.log(currentHole);
  currentMole.classList.add("up"); // HELP : UNDEFINED
  console.log(currentMole.classList.add("up")); // HELP : UNDEFINED
  setTimeout(() => {
    currentMole.classList.remove("up"); // HELP : UNDEFINED
    if (gameIsOn) {
        molePeeps();
    }
  }, timer);
}

// Chronometer Function

let countdownChrono = () => {
  const intervalId = setInterval(() => {
    chrono.textContent = --timeRemaining;
    if (timeRemaining === 0) {
      clearInterval(intervalId);
      console.log("GAME OVER");
    //   alert("GAME OVER");
    }
  }, 1000);
};

// Function hit : add points when click event, mole goes down
function hitTheMole() {
    const currentHole = randomHole(holes);
    score.textContent++;
    currentHole.querySelector(".mole").classList.remove("up");
  }
  
moles.forEach((mole) => mole.addEventListener("click", hitTheMole));

// Function start game, enables molePeeps until chrono = 0

function play() {
    gameIsOn = true;
    countdownChrono();
    molePeeps(); 
    setTimeout(() => gameIsOn = false, (timeRemaining)*1000);
}

startBtn.addEventListener("click", play);