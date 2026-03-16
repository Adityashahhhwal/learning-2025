const BOARD_SIZE = 20;
const STORAGE_KEY = 'retro-snake-high-score';

const CONFIG = {
  lives: 3,
  startSpeed: 190,
  minSpeed: 85,
  levelStepFoods: 5,
  speedStep: 12,
  superFoodEvery: 4,
  superFoodLifetime: 5000,
  boostDuration: 6000,
  betweenLivesDelay: 900,
  points: {
    food: 1,
    superFood: 3
  },
  growth: {
    food: 1,
    superFood: 3
  }
};

const DIRECTION_KEYS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

const DIRECTIONS = {
  up: { x: 0, y: -1, opposite: 'down' },
  down: { x: 0, y: 1, opposite: 'up' },
  left: { x: -1, y: 0, opposite: 'right' },
  right: { x: 1, y: 0, opposite: 'left' }
};

const elements = {
  board: document.getElementById('game-board'),
  score: document.getElementById('score-value'),
  highScore: document.getElementById('high-score-value'),
  level: document.getElementById('level-value'),
  lives: document.getElementById('lives-display'),
  state: document.getElementById('state-value'),
  overlay: document.getElementById('game-overlay'),
  overlayKicker: document.getElementById('overlay-kicker'),
  overlayTitle: document.getElementById('overlay-title'),
  overlayText: document.getElementById('overlay-text'),
  statusText: document.getElementById('status-text')
};

const state = {
  phase: 'idle',
  snake: [],
  direction: 'right',
  queuedDirection: null,
  food: null,
  superFood: null,
  score: 0,
  highScore: loadHighScore(),
  level: 1,
  lives: CONFIG.lives,
  foodsCollected: 0,
  normalFoodsSinceSuper: 0,
  pendingGrowth: 0,
  boostUntil: 0,
  boostActive: false,
  lastFrameTime: 0,
  stepAccumulator: 0,
  lifeResumeAt: 0,
  pausedAt: 0,
  audio: createAudioEngine(),
  lastOutcome: 'ready',
  needsRender: true
};

function loadHighScore() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    const parsedValue = Number.parseInt(storedValue ?? '0', 10);

    return Number.isNaN(parsedValue) ? 0 : parsedValue;
  } catch {
    return 0;
  }
}

function saveHighScore() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(state.highScore));
  } catch {
    // localStorage can fail in private windows or restricted environments.
  }
}

function createAudioEngine() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return {
      enabled: false,
      unlock() {},
      play() {}
    };
  }

  let context = null;
  let enabled = true;

  const sequences = {
    start: [
      { frequency: 220, duration: 0.08, type: 'square', volume: 0.035 },
      { frequency: 330, duration: 0.1, delay: 0.09, type: 'square', volume: 0.04 }
    ],
    eat: [
      { frequency: 420, duration: 0.06, type: 'square', volume: 0.03 },
      { frequency: 520, duration: 0.05, delay: 0.04, type: 'square', volume: 0.03 }
    ],
    superFood: [
      { frequency: 440, duration: 0.07, type: 'triangle', volume: 0.035 },
      { frequency: 660, duration: 0.08, delay: 0.06, type: 'triangle', volume: 0.035 },
      {
        frequency: 880,
        duration: 0.12,
        delay: 0.13,
        type: 'sawtooth',
        volume: 0.04
      }
    ],
    levelUp: [
      { frequency: 330, duration: 0.08, type: 'triangle', volume: 0.03 },
      { frequency: 495, duration: 0.08, delay: 0.07, type: 'triangle', volume: 0.03 },
      { frequency: 660, duration: 0.1, delay: 0.14, type: 'triangle', volume: 0.04 }
    ],
    lifeLost: [
      {
        frequency: 260,
        duration: 0.12,
        type: 'sawtooth',
        slideTo: 170,
        volume: 0.035
      }
    ],
    gameOver: [
      {
        frequency: 260,
        duration: 0.16,
        type: 'triangle',
        slideTo: 210,
        volume: 0.035
      },
      {
        frequency: 210,
        duration: 0.18,
        delay: 0.13,
        type: 'triangle',
        slideTo: 160,
        volume: 0.035
      },
      {
        frequency: 160,
        duration: 0.22,
        delay: 0.28,
        type: 'triangle',
        slideTo: 110,
        volume: 0.04
      }
    ]
  };

  const ensureContext = () => {
    if (!enabled) {
      return null;
    }

    if (!context) {
      try {
        context = new AudioContextClass();
      } catch {
        enabled = false;
        return null;
      }
    }

    return context;
  };

  const playTone = (audioContext, note) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const startTime = audioContext.currentTime + (note.delay ?? 0);
    const duration = note.duration ?? 0.08;
    const volume = note.volume ?? 0.03;

    oscillator.type = note.type ?? 'square';
    oscillator.frequency.setValueAtTime(note.frequency, startTime);

    if (note.slideTo) {
      oscillator.frequency.exponentialRampToValueAtTime(
        note.slideTo,
        startTime + duration
      );
    }

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + duration
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.02);
  };

  return {
    get enabled() {
      return enabled;
    },
    unlock() {
      const audioContext = ensureContext();

      if (!audioContext) {
        return Promise.resolve();
      }

      if (audioContext.state === 'suspended') {
        return audioContext.resume().catch(() => {
          enabled = false;
        });
      }

      return Promise.resolve();
    },
    play(name) {
      const audioContext = ensureContext();
      const sequence = sequences[name];

      if (!audioContext || !sequence) {
        return;
      }

      const runSequence = () => {
        try {
          sequence.forEach((note) => playTone(audioContext, note));
        } catch {
          enabled = false;
        }
      };

      if (audioContext.state === 'running') {
        runSequence();
        return;
      }

      audioContext.resume().then(runSequence).catch(() => {
        enabled = false;
      });
    }
  };
}

function createStartingSnake() {
  const centerY = Math.floor(BOARD_SIZE / 2);

  return [
    { x: 4, y: centerY },
    { x: 3, y: centerY },
    { x: 2, y: centerY }
  ];
}

function resetRunState() {
  state.phase = 'idle';
  state.snake = createStartingSnake();
  state.direction = 'right';
  state.queuedDirection = null;
  state.food = null;
  state.superFood = null;
  state.score = 0;
  state.level = 1;
  state.lives = CONFIG.lives;
  state.foodsCollected = 0;
  state.normalFoodsSinceSuper = 0;
  state.pendingGrowth = 0;
  state.boostUntil = 0;
  state.boostActive = false;
  state.stepAccumulator = 0;
  state.lifeResumeAt = 0;
  state.pausedAt = 0;
  state.lastOutcome = 'ready';
  state.food = spawnFood('food');
  state.needsRender = true;
}

function startGame() {
  resetRunState();
  state.phase = 'running';
  state.lastFrameTime = performance.now();
  elements.statusText.textContent =
    'Arrow keys move. Press P to pause. Super food gives bonus growth and score.';
  state.audio.play('start');
}

function pauseGame() {
  if (state.phase === 'running') {
    state.phase = 'paused';
    state.pausedAt = performance.now();
    elements.statusText.textContent = 'Paused. Press P to continue the run.';
    state.needsRender = true;
    return;
  }

  if (state.phase === 'paused') {
    const pauseDuration = performance.now() - state.pausedAt;

    if (state.superFood) {
      state.superFood.expiresAt += pauseDuration;
    }

    if (state.boostActive) {
      state.boostUntil += pauseDuration;
    }

    state.phase = 'running';
    state.stepAccumulator = 0;
    state.lastFrameTime = performance.now();
    state.pausedAt = 0;
    elements.statusText.textContent =
      'Back in motion. Watch for timed super food on the board.';
    state.needsRender = true;
  }
}

function spawnFood(type) {
  const blocked = new Set(state.snake.map(positionToKey));

  if (state.food && type !== 'food') {
    blocked.add(positionToKey(state.food));
  }

  if (state.superFood && type !== 'super') {
    blocked.add(positionToKey(state.superFood));
  }

  const freeCells = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const cell = { x, y };

      if (!blocked.has(positionToKey(cell))) {
        freeCells.push(cell);
      }
    }
  }

  if (!freeCells.length) {
    return null;
  }

  const choice = freeCells[Math.floor(Math.random() * freeCells.length)];

  if (type === 'super') {
    return {
      ...choice,
      expiresAt: performance.now() + CONFIG.superFoodLifetime
    };
  }

  return choice;
}

function positionToKey({ x, y }) {
  return `${x},${y}`;
}

function isOutOfBounds({ x, y }) {
  return x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE;
}

function isSameCell(first, second) {
  return Boolean(first && second) && first.x === second.x && first.y === second.y;
}

function queueDirection(nextDirection) {
  if (state.phase !== 'running') {
    return;
  }

  const comparisonDirection = state.queuedDirection ?? state.direction;

  if (
    nextDirection === comparisonDirection ||
    nextDirection === DIRECTIONS[comparisonDirection].opposite
  ) {
    return;
  }

  if (!state.queuedDirection) {
    state.queuedDirection = nextDirection;
  }
}

function updateBoostState(now) {
  const wasBoostActive = state.boostActive;

  state.boostActive = now < state.boostUntil;

  if (wasBoostActive !== state.boostActive) {
    state.needsRender = true;
  }
}

function updateSuperFoodState(now) {
  if (state.superFood && now >= state.superFood.expiresAt) {
    state.superFood = null;
    elements.statusText.textContent =
      'The super food disappeared. Eat 4 more normal bites to spawn another.';
    state.needsRender = true;
  }
}

function applyQueuedDirection() {
  if (!state.queuedDirection) {
    return;
  }

  if (state.queuedDirection !== DIRECTIONS[state.direction].opposite) {
    state.direction = state.queuedDirection;
  }

  state.queuedDirection = null;
}

function stepGame(now) {
  applyQueuedDirection();

  const directionVector = DIRECTIONS[state.direction];
  const nextHead = {
    x: state.snake[0].x + directionVector.x,
    y: state.snake[0].y + directionVector.y
  };

  if (isOutOfBounds(nextHead)) {
    handleCollision(now);
    return;
  }

  const ateNormalFood = isSameCell(nextHead, state.food);
  const ateSuperFood = isSameCell(nextHead, state.superFood);
  const growthGain = ateSuperFood
    ? CONFIG.growth.superFood
    : ateNormalFood
      ? CONFIG.growth.food
      : 0;
  const growthBudget = state.pendingGrowth + growthGain;
  const bodyToCheck =
    growthBudget > 0 ? state.snake : state.snake.slice(0, -1);
  const collidedWithSelf = bodyToCheck.some((segment) => isSameCell(segment, nextHead));

  if (collidedWithSelf) {
    handleCollision(now);
    return;
  }

  state.snake.unshift(nextHead);

  if (growthBudget > 0) {
    state.pendingGrowth = growthBudget - 1;
  } else {
    state.pendingGrowth = 0;
    state.snake.pop();
  }

  if (ateSuperFood) {
    collectSuperFood(now);
  } else if (ateNormalFood) {
    collectNormalFood();
  }

  state.needsRender = true;

  if (!state.food) {
    state.food = spawnFood('food');
  }

  if (!state.food && !state.superFood) {
    completeBoard();
  }
}

function collectNormalFood() {
  const pointsEarned = state.boostActive
    ? CONFIG.points.food * 2
    : CONFIG.points.food;

  state.score += pointsEarned;
  state.foodsCollected += 1;
  state.normalFoodsSinceSuper += 1;
  state.food = spawnFood('food');
  state.lastOutcome = state.boostActive ? 'boost-food' : 'food';
  elements.statusText.textContent = state.boostActive
    ? 'Boost active: normal food is worth double points.'
    : 'Clean bite. Keep building toward the next level.';
  state.audio.play('eat');
  updateLevel();

  if (state.normalFoodsSinceSuper >= CONFIG.superFoodEvery && !state.superFood) {
    state.normalFoodsSinceSuper = 0;
    state.superFood = spawnFood('super');

    if (state.superFood) {
      elements.statusText.textContent =
        'Super food spawned. Grab it before it expires.';
    }
  }
}

function collectSuperFood(now) {
  state.score += CONFIG.points.superFood;
  state.foodsCollected += 1;
  state.superFood = null;
  state.boostUntil = now + CONFIG.boostDuration;
  state.boostActive = true;
  state.lastOutcome = 'super';
  elements.statusText.textContent =
    'Super food collected. Bonus growth active and normal food now scores double.';
  state.audio.play('superFood');
  updateLevel();
}

function updateLevel() {
  const nextLevel = Math.floor(state.foodsCollected / CONFIG.levelStepFoods) + 1;

  if (nextLevel > state.level) {
    state.level = nextLevel;
    state.audio.play('levelUp');
    elements.statusText.textContent = `Level ${String(state.level).padStart(2, '0')} reached. The snake speeds up.`;
  }

  if (state.score > state.highScore) {
    state.highScore = state.score;
    saveHighScore();
  }
}

function getStepDuration() {
  return Math.max(
    CONFIG.minSpeed,
    CONFIG.startSpeed - (state.level - 1) * CONFIG.speedStep
  );
}

function handleCollision(now) {
  state.lives -= 1;
  state.queuedDirection = null;
  state.pendingGrowth = 0;
  state.boostUntil = 0;
  state.boostActive = false;
  state.superFood = null;
  state.audio.play(state.lives > 0 ? 'lifeLost' : 'gameOver');

  if (state.lives > 0) {
    state.phase = 'between-lives';
    state.lifeResumeAt = now + CONFIG.betweenLivesDelay;
    state.lastOutcome = 'life-lost';
    elements.statusText.textContent =
      'Crash detected. One life lost, resetting the snake.';
  } else {
    finishGame();
  }

  state.needsRender = true;
}

function resetSnakeAfterLifeLoss() {
  state.snake = createStartingSnake();
  state.direction = 'right';
  state.queuedDirection = null;
  state.pendingGrowth = 0;
  state.food = spawnFood('food');
  state.superFood = null;
  state.phase = 'running';
  state.stepAccumulator = 0;
  state.lastFrameTime = performance.now();
  elements.statusText.textContent =
    'Back in play. Your score and level are preserved.';
  state.needsRender = true;
}

function finishGame() {
  state.phase = 'game-over';
  state.lastOutcome = 'game-over';

  if (state.score > state.highScore) {
    state.highScore = state.score;
    saveHighScore();
  }

  elements.statusText.textContent =
    'Game over. Press Space to restart the arcade run.';
}

function completeBoard() {
  state.phase = 'game-over';
  state.lastOutcome = 'board-cleared';

  if (state.score > state.highScore) {
    state.highScore = state.score;
    saveHighScore();
  }

  elements.statusText.textContent =
    'Board cleared. Press Space to start a new perfect run.';
  state.needsRender = true;
}

function updateBetweenLives(now) {
  if (state.phase === 'between-lives' && now >= state.lifeResumeAt) {
    resetSnakeAfterLifeLoss();
  }
}

function formatNumber(value, width = 4) {
  return String(value).padStart(width, '0');
}

function renderLives() {
  const heartsMarkup = Array.from({ length: CONFIG.lives }, (_, index) => {
    const isActive = index < state.lives;

    return `<span class="heart ${isActive ? 'is-active' : ''}" aria-hidden="true">&#10084;</span>`;
  }).join('');

  elements.lives.innerHTML = heartsMarkup;
  elements.lives.setAttribute('aria-label', `${state.lives} lives remaining`);
}

function createEntity({ x, y }, className) {
  const entity = document.createElement('div');

  entity.className = `entity ${className}`;
  entity.style.gridColumnStart = String(x + 1);
  entity.style.gridRowStart = String(y + 1);

  return entity;
}

function renderBoard() {
  const fragment = document.createDocumentFragment();
  const boostedClass = state.boostActive ? ' is-boosted' : '';

  state.snake.forEach((segment, index) => {
    const className =
      index === 0
        ? `snake-head${boostedClass}`
        : `snake-segment${boostedClass}`;

    fragment.append(createEntity(segment, className));
  });

  if (state.food) {
    fragment.append(createEntity(state.food, 'food'));
  }

  if (state.superFood) {
    fragment.append(createEntity(state.superFood, 'food-super'));
  }

  elements.board.replaceChildren(fragment);
  elements.board.classList.toggle('is-boosted', state.boostActive);
}

function getOverlayContent() {
  switch (state.phase) {
    case 'idle':
      return {
        hidden: false,
        kicker: 'Retro Snake',
        title: 'Press Space to Start',
        text: 'Arrow keys move. Survive three lives and collect the timed super food for bonus growth.'
      };
    case 'paused':
      return {
        hidden: false,
        kicker: 'Paused',
        title: 'Run on Hold',
        text: 'Press P to continue from the same score, level, and position.'
      };
    case 'between-lives':
      return {
        hidden: false,
        kicker: 'Life Lost',
        title: 'Rebooting Snake',
        text: 'The board is resetting. Your score and level stay intact.'
      };
    case 'game-over':
      return {
        hidden: false,
        kicker:
          state.lastOutcome === 'board-cleared' ? 'Victory' : 'Game Over',
        title:
          state.lastOutcome === 'board-cleared'
            ? 'Board Cleared'
            : 'Press Space to Replay',
        text:
          state.lastOutcome === 'board-cleared'
            ? `You filled the grid with a final score of ${formatNumber(state.score)}.`
            : `Final score ${formatNumber(state.score)}. High score ${formatNumber(state.highScore)}.`
      };
    default:
      return { hidden: true, kicker: '', title: '', text: '' };
  }
}

function getStateLabel() {
  if (state.phase === 'running' && state.boostActive) {
    return 'Boost';
  }

  switch (state.phase) {
    case 'idle':
      return 'Idle';
    case 'paused':
      return 'Paused';
    case 'between-lives':
      return 'Recover';
    case 'game-over':
      return state.lastOutcome === 'board-cleared' ? 'Won' : 'Over';
    default:
      return 'Live';
  }
}

function renderOverlay() {
  const overlay = getOverlayContent();

  elements.overlay.hidden = overlay.hidden;
  elements.overlayKicker.textContent = overlay.kicker;
  elements.overlayTitle.textContent = overlay.title;
  elements.overlayText.textContent = overlay.text;
}

function renderHud() {
  elements.score.textContent = formatNumber(state.score);
  elements.highScore.textContent = formatNumber(state.highScore);
  elements.level.textContent = formatNumber(state.level, 2);
  elements.state.textContent = getStateLabel();
  renderLives();
}

function render() {
  renderHud();
  renderBoard();
  renderOverlay();
  state.needsRender = false;
}

function handleKeyDown(event) {
  const keyDirection = DIRECTION_KEYS[event.key];

  if (event.code === 'Space') {
    event.preventDefault();
    state.audio.unlock();

    if (state.phase === 'idle' || state.phase === 'game-over') {
      startGame();
      state.needsRender = true;
    }

    return;
  }

  if (event.key.toLowerCase() === 'p') {
    event.preventDefault();
    pauseGame();
    return;
  }

  if (!keyDirection) {
    return;
  }

  event.preventDefault();
  state.audio.unlock();
  queueDirection(keyDirection);
}

function gameLoop(now) {
  if (!state.lastFrameTime) {
    state.lastFrameTime = now;
  }

  const delta = now - state.lastFrameTime;

  state.lastFrameTime = now;

  if (state.phase !== 'paused') {
    updateBoostState(now);
    updateSuperFoodState(now);
    updateBetweenLives(now);
  }

  if (state.phase === 'running') {
    state.stepAccumulator += delta;

    while (state.stepAccumulator >= getStepDuration() && state.phase === 'running') {
      state.stepAccumulator -= getStepDuration();
      stepGame(now);
    }
  }

  if (state.needsRender) {
    render();
  }

  window.requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', handleKeyDown);

resetRunState();
render();
window.requestAnimationFrame(gameLoop);
