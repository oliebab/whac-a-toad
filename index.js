const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const chrono = document.getElementById("chrono");
const score = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

let timeRemaining = 10;
let defaultScore = 0;
let timeUp = false;

// Set a random timer for the mole to pop up
function randomPeepTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Select a random hole for the mole to pop up, using a random index
function randomHole() {
  const holeIndex = Math.floor(Math.random() * 9);
  const selectedHole = holes[holeIndex];
  console.log(selectedHole);
  return selectedHole;
}

// Select a random mole (Toad, Coin or Bomb) that pops up in the selected hole

// function randomMole() {
//     const moleIndex = Math.floor(Math.random() * 3);
//     const selectedMole = moles[moleIndex];
//     return selectedMole;
// }

// Get the mole to pop up from the selected hole

function molePeeps() {
  const timer = randomPeepTime(400, 900);
  console.log(timer);
  const currentHole = randomHole(holes);
  console.log(currentHole);
  currentHole.querySelector(".mole").classList.add("up");
  setTimeout(() => {
    currentHole.querySelector(".mole").classList.remove("up");
    molePeeps();
  }, timer);
}

// Chronometer Function

let countdownChrono = () => {
  const intervalId = setInterval(() => {
    chrono.textContent = --timeRemaining;
    if (timeRemaining === 0) {
      clearInterval(intervalId);
      console.log("GAME OVER");
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
    countdownChrono();
    molePeeps();
}

startBtn.addEventListener("click", play);

// function reset() {
//     timeRemaining = 10;
//     defaultScore = 0;
// }

// resetBtn.addEventListener("click", reset);




// start.addEventListener("click", play());

// play();

// const revealBitchSection = () => {
//     bitchSection.classList.toggle("hidden")
//   }

//   magicBtn.addEventListener("click", revealBitchSection)
