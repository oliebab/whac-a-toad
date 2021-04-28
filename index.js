const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const chrono = document.getElementById("chrono");
const score = document.getElementById("score");
const start = document.getElementById("start-btn");

let timeRemaining = 10;
let defaultScore = 0;

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
// }

// Get the mole to pop up from the selected hole

function molePeeps() {
  const timer = randomPeepTime(500, 1000);
  console.log(timer);
  const currentHole = randomHole(holes);
  console.log(currentHole);
  currentHole.querySelector(".mole").classList.add("up");
  setTimeout(() => {
    currentHole.querySelector(".mole").classList.remove("up");
    molePeeps();
  }, timer);
}

// Chronometer Function XXX HELP

let countdownChrono = () => {
  const intervalId = setInterval(() => {
    chrono.textContent = --timeRemaining;
    if (timeRemaining === 0) {
      clearInterval(intervalId);
      console.log("GAME OVER");
    }
  }, 1000);
};

// Function start game, enables molePeeps until chrono = 0

function play(evt) {
    setTimeout(() => {
        countdownChrono();
        molePeeps();
    }, 10000)
}

function hitTheMole() {
  const currentHole = randomHole(holes);
  score.textContent++;
  currentHole.querySelector(".mole").classList.remove("up");
}

moles.forEach((mole) => mole.addEventListener("click", hitTheMole));

// start.addEventListener("click", play());

play();

// const revealBitchSection = () => {
//     bitchSection.classList.toggle("hidden")
//   }

//   magicBtn.addEventListener("click", revealBitchSection)
