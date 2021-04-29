const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const chrono = document.getElementById("chrono");
const score = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

//audio elements
const mainMusic = document.getElementById("music");
const winMusic = document.getElementById("win-music");
const successMusic = document.getElementById("success-music");
const loseMusic = document.getElementById("lose-music");
const hitBomb = document.getElementById("bomb-music");
const hitCoin = document.getElementById("coin-music");
//  


let intervalIdChrono;
let intervalIdMoles;
let timeRemaining = 5;
let defaultScore = 0;
let gameIsOn = true;

music.autoplay;

// Select a random hole for the mole to pop up, using a random index
function randomHole() {
  const holeIndex = Math.floor(Math.random() * 8);
  const selectedHole = holes[holeIndex];
  console.log("which hole ??????", selectedHole);
  return selectedHole;
}

// Select a random mole (Toad, Bomb or Coin) with probabilities (70%, 20%, 10% respectively) that pops up in the selected hole

function randomMole() {
  const currentHole = randomHole(holes);
  const moleIndex = Math.floor(Math.random() * 10);
  const possibilitiesArray = [
    "toad",
    "toad",
    "toad",
    "toad",
    "toad",
    "toad",
    "toad",
    "bomb",
    "bomb",
    "coin",
  ];

  const mole = currentHole.querySelector(".mole");
  // mole.className = "mole";

  let randomizer = possibilitiesArray[moleIndex];
  if (randomizer === "toad") {
    mole.classList.add("toad");
  } else if (randomizer === "bomb") {
    mole.classList.add("bomb");
  } else if (randomizer === "coin") {
    mole.classList.add("coin"); 
  }
  //console.log("which type of mole ?????", currentMole);
  return mole;
}

// Set a random timer for the mole to pop up
function randomPeepTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Get the selected mole to pop up from the selected hole

function molePeeps() {
  const timer = randomPeepTime(500, 1000);
  const thisMolePeeps = randomMole();
  if (thisMolePeeps.classList.contains("up")) return;
  thisMolePeeps.classList.add("up");
  setTimeout(() => {
    thisMolePeeps.classList.remove("up");
    setTimeout(() => {
      thisMolePeeps.classList.remove("toad");
      thisMolePeeps.classList.remove("coin");
      thisMolePeeps.classList.remove("bomb");
    }, 300);
    // if (gameIsOn) {
    //   molePeeps();
    // }
  }, timer);
 
}

// Chronometer Function

let countdownChrono = () => {
  intervalIdChrono = setInterval(() => {
    chrono.textContent = --timeRemaining;
    if (timeRemaining === 0) {
      mainMusic.pause();
      successMusic.play();
      setTimeout(() => {
        winMusic.play();
      }, 5500);
      gameOver();
      alert(`Well Done ! your score is ${score.textContent}` )
    }
  }, 1000);
};

function gameOver() {
  gameIsOn = false;
  clearIntervals();
}


function clearIntervals() {
  clearInterval(intervalIdChrono);
  clearInterval(intervalIdMoles);
}

window.onbeforeunload = clearIntervals;

// Function hit : add points when click event, mole goes down
function hitTheMole(e) {
  const currentMole = e.target;
  let modifier = 0;
  let currentScore = Number(score.textContent);
  console.log(currentMole);

  if (currentMole.classList.contains("toad", "up")) {
    modifier = 1;
  } else if (currentMole.classList.contains("bomb", "up")) {
    hitBomb.play();
    gameOver();
    mainMusic.pause();
    setTimeout(() => {
      loseMusic.play();
    }, 4000);
    alert("Oh no ! You hit a BOMB !!!");
  } else if (currentMole.classList.contains("coin", "up")) {
    hitCoin.play();
    modifier = 10;
  } 
  currentMole.classList.remove("up");
  score.textContent = currentScore + modifier;
}

// Function start game, enables molePeeps until chrono = 0

function playGame() {
  gameIsOn = true;
  countdownChrono();
  molePeeps();
  moles.forEach((mole) => {
    mole.addEventListener("click", hitTheMole);
  });
  intervalIdMoles =  setInterval(molePeeps, 1200)
}

console.log(moles);

startBtn.addEventListener("click", playGame);
