// GAME_PIXEL_COUNT is the pixels on horizontal or vertical axis of the game board (SQUARE).
const GAME_PIXEL_COUNT = 40;
const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);

let totalFoodAte = 0;
let totalDistanceTravelled = 0;

/// THE GAME BOARD:
const gameContainer = document.getElementById("gameContainer");

const createGameBoardPixels = () => {
  let gamePixelDivs = '';
  for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i) {
    gamePixelDivs = `${gamePixelDivs} <div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
  // Populate the [#gameContainer] div with small div's representing game pixels
  gameContainer.innerHTML = `${gameContainer.innerHTML} ${gamePixelDivs}`;
};

// This variable always holds the updated array of game pixels created by createGameBoardPixels() :
const gameBoardPixels = document.getElementsByClassName("gameBoardPixel");

/// THE FOOD:
let currentFoodPostion = 0;
const createFood = () => {
  // Remove previous food;
  gameBoardPixels[currentFoodPostion].classList.remove("food");

  // Create new food
  currentFoodPostion = Math.random();
  currentFoodPostion = Math.floor(
    currentFoodPostion * SQUARE_OF_GAME_PIXEL_COUNT
  );
  gameBoardPixels[currentFoodPostion].classList.add("food");
};

/// THE SNAKE:

// Direction codes (Keyboard key codes for arrow keys):
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

// Set snake direction initially to right
let snakeCurrentDirection = RIGHT_DIR;

const changeDirection = (newDirectionCode) => {
  // Change the direction of the snake
  if (newDirectionCode == snakeCurrentDirection) return;

  if (newDirectionCode == LEFT_DIR && snakeCurrentDirection != RIGHT_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == UP_DIR && snakeCurrentDirection != DOWN_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (
    newDirectionCode == RIGHT_DIR &&
    snakeCurrentDirection != LEFT_DIR
  ) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection != UP_DIR) {
    snakeCurrentDirection = newDirectionCode;
  }
};

// Let the starting position of the snake be at the middle of game board
let currentSnakeHeadPosition = SQUARE_OF_GAME_PIXEL_COUNT / 2;

// Initial snake length
let snakeLength = 1000;

// Track active timeouts so we can clear them on reset
let activeTimeouts = [];

// Move snake continously by calling this function repeatedly :
const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case LEFT_DIR:
      --currentSnakeHeadPosition;
      const isSnakeHeadAtLastGameBoardPixelTowardsLeft =
        currentSnakeHeadPosition % GAME_PIXEL_COUNT == GAME_PIXEL_COUNT - 1 ||
        currentSnakeHeadPosition < 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsLeft) {
        currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
      }
      break;
    case UP_DIR:
      currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
      const isSnakeHeadAtLastGameBoardPixelTowardsUp =
        currentSnakeHeadPosition < 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsUp) {
        currentSnakeHeadPosition =
          currentSnakeHeadPosition + SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
    case RIGHT_DIR:
      ++currentSnakeHeadPosition;
      const isSnakeHeadAtLastGameBoardPixelTowardsRight =
        currentSnakeHeadPosition % GAME_PIXEL_COUNT == 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsRight) {
        currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
      }
      break;
    case DOWN_DIR:
      currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
      const isSnakeHeadAtLastGameBoardPixelTowardsDown =
        currentSnakeHeadPosition > SQUARE_OF_GAME_PIXEL_COUNT - 1;
      if (isSnakeHeadAtLastGameBoardPixelTowardsDown) {
        currentSnakeHeadPosition =
          currentSnakeHeadPosition - SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
    default:
      break;
  }

  let nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];

  // Kill snake if it bites itself:
  if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
    clearInterval(moveSnakeInterval);
    handleGameOver();
    return;
  }

  nextSnakeHeadPixel.classList.add("snakeBodyPixel");

  const tid = setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
  }, snakeLength);
  activeTimeouts.push(tid);

  // Update total distance travelled
  totalDistanceTravelled++;
  // Update in UI:
  document.getElementById("blocksTravelled").innerHTML = totalDistanceTravelled;

  if (currentSnakeHeadPosition == currentFoodPostion) {
    // Update total food ate
    totalFoodAte++;
    // Update in UI:
    document.getElementById("pointsEarned").innerHTML = totalFoodAte;

    // Increase Snake length:
    snakeLength = snakeLength + 100;
    createFood();
    playEatSound();
  }
};

/// SCREENS & STATE MANAGEMENT

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreSpan = document.getElementById("finalScore");
const bestScoreSpan = document.getElementById("bestScore");
const playButton = document.getElementById("playButton");
const retryButton = document.getElementById("retryButton");
const menuButton = document.getElementById("menuButton");

const BEST_SCORE_KEY = "neonSerpentBestScore";
let bestScore = parseInt(localStorage.getItem(BEST_SCORE_KEY)) || 0;
let moveSnakeInterval = null;

const showScreen = (screen) => screen.classList.remove("hidden");
const hideScreen = (screen) => screen.classList.add("hidden");

const resetGameState = () => {
  // Clear pending timeouts from previous run
  activeTimeouts.forEach(clearTimeout);
  activeTimeouts = [];

  // Clear existing snake body pixels
  for (let i = 0; i < gameBoardPixels.length; i++) {
    gameBoardPixels[i].classList.remove("snakeBodyPixel");
  }

  // Reset variables
  totalFoodAte = 0;
  totalDistanceTravelled = 0;
  snakeLength = 1000;
  snakeCurrentDirection = RIGHT_DIR;
  currentSnakeHeadPosition = SQUARE_OF_GAME_PIXEL_COUNT / 2;

  // Update UI
  document.getElementById("pointsEarned").innerHTML = "0";
  document.getElementById("blocksTravelled").innerHTML = "0";

  // Recreate food
  createFood();
};

const handleGameOver = () => {
  if (bgMusic) bgMusic.volume = 0.05;
  playGameOverSound();

  if (totalFoodAte > bestScore) {
    bestScore = totalFoodAte;
    localStorage.setItem(BEST_SCORE_KEY, bestScore);
  }
  finalScoreSpan.innerHTML = totalFoodAte;
  bestScoreSpan.innerHTML = bestScore;
  showScreen(gameOverScreen);
};

const startGame = () => {
  ensureAudio();
  startBackgroundMusic();
  hideScreen(startScreen);
  hideScreen(gameOverScreen);
  resetGameState();
  moveSnakeInterval = setInterval(moveSnake, 80);
};

// KEYBOARD CONTROLS (Arrows + WASD)
addEventListener("keydown", (e) => {
  ensureAudio();

  // Prevent default scrolling for game keys
  if ([32, 37, 38, 39, 40, 65, 68, 83, 87].includes(e.keyCode)) {
    e.preventDefault();
  }

  let code = e.keyCode;
  if (code === 65) code = LEFT_DIR;   // A
  if (code === 87) code = UP_DIR;     // W
  if (code === 68) code = RIGHT_DIR;  // D
  if (code === 83) code = DOWN_DIR;   // S

  changeDirection(code);
});

// BUTTON EVENTS
playButton.addEventListener("click", startGame);
retryButton.addEventListener("click", startGame);
menuButton.addEventListener("click", () => {
  hideScreen(gameOverScreen);
  showScreen(startScreen);
});

// ON SCREEN CONTROLLERS:
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");

leftButton.onclick = () => changeDirection(LEFT_DIR);
rightButton.onclick = () => changeDirection(RIGHT_DIR);
upButton.onclick = () => changeDirection(UP_DIR);
downButton.onclick = () => changeDirection(DOWN_DIR);

/// AUDIO SYSTEM
let audioCtx = null;
const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;

const ensureAudio = async () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
};

const startBackgroundMusic = () => {
  if (musicStarted) return;
  musicStarted = true;
  if (bgMusic) {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {
      musicStarted = false;
    });
  }
};

const playTone = ({ freq = 440, type = "sine", duration = 100, gain = 0.1, freqEnd = null }) => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  if (freqEnd !== null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), audioCtx.currentTime + duration / 1000);
  }
  g.gain.setValueAtTime(gain, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration / 1000);
};

const playEatSound = () => {
  playTone({ freq: 900, freqEnd: 1200, type: "sine", duration: 80, gain: 0.08 });
};

const playGameOverSound = () => {
  playTone({ freq: 300, freqEnd: 80, type: "sawtooth", duration: 400, gain: 0.1 });
};

/// FIRST INTERACTION — start music once
const initMusicOnce = () => startBackgroundMusic();
window.addEventListener("keydown", initMusicOnce, { once: true });
document.addEventListener("click", initMusicOnce, { once: true });

/// INITIALIZATION
createGameBoardPixels();
createFood();
showScreen(startScreen);
