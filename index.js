const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const chrono = document.getElementById("chrono");
const score = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

let intervalIdChrono;
let intervalIdMoles;
let timeRemaining = 10;
let defaultScore = 0;
let gameIsOn = true;
// music.autoplay;

// Select a random hole for the mole to pop up, using a random index
function randomHole() {
  const holeIndex = Math.floor(Math.random() * 9);
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
  const timer = randomPeepTime(500, 1200);
  const thisMolePeeps = randomMole();
  if (thisMolePeeps.classList.contains("up")) return;
  thisMolePeeps.classList.add("up");
  setTimeout(() => {
    thisMolePeeps.classList.remove("up");
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
      gameOver();
    }
  }, 1000);
};

function gameOver() {
  gameIsOn = false;
  clearIntervals()
  alert("GAME OVER");
}

function clearIntervals() {
  clearInterval(intervalIdChrono);
  clearInterval(intervalIdMoles)
}

window.onbeforeunload = clearIntervals;

// Function hit : add points when click event, mole goes down
function hitTheMole() {
  const currentMole = randomMole();
  // moles.classList.contains("up");
  let modifier = 0;
  let currentScore = Number(score.textContent);
  console.log(currentMole);

  if (currentMole.classList.contains("toad")) {
    modifier = 1;
  } else if (currentMole.classList.contains("bomb")) {
    modifier = -10;
    // gameOver();
  } else if (currentMole.classList.contains("coin")) {
    modifier = 10;
  } 
  currentMole.classList.remove("up");
  score.textContent = currentScore + modifier;
}

// Function start game, enables molePeeps until chrono = 0

function play() {
  gameIsOn = true;
  countdownChrono();
  molePeeps();
  moles.forEach((mole) => {
    mole.addEventListener("click", hitTheMole);
  });
  intervalIdMoles =  setInterval(molePeeps, 1000)
}

console.log(moles);

startBtn.addEventListener("click", play);

// function gameOver() {
//     timeRemaining = 10;
//     score = defaultScore;
//     gameIsOn = false;
//     clearInterval
// }

// resetBtn.addEventListener("click", reset);

// start.addEventListener("click", play());

// play();

// const revealBitchSection = () => {
//     bitchSection.classList.toggle("hidden")
//   }

//   magicBtn.addEventListener("click", revealBitchSection)

/* <aside class="right-elements">
    <div class="audio">
        <audio autoplay="" loop="" id="background-music" src="./style/music/mitchrineko.mp3"></audio>
        <button id="play" onclick="document.getElementById('background-music').play()"><img src="./style/img/Play_icon.svg" alt=""></button>
        <button id="pause" onclick="document.getElementById('background-music').pause()"><img src="./style/img/Pause_icon.svg" alt=""></button>
    </div>
                
    <p><span>0</span>/20</p>
    <p>fish found</p>
                
 </aside> */
