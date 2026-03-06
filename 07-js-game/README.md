# Retro Snake Game 🐍

A classic, retro-style Snake game built entirely with Vanilla JavaScript, HTML5, and CSS3. 

![Snake Game Screenshot](snake-game-ai-gen.png)

## 🎮 Play the Game
**[Live Demo ↗](https://adityashahhhwal.github.io/learning-2025/07-js-game/)**

## ✨ Features
- **Classic Gameplay**: Eat the red apples to grow your snake and increase your score.
- **Progressive Difficulty**: The game speed increases as your snake gets longer!
- **Persistent High Score**: Your highest score is tracked and displayed visually as long as the session is active.
- **Robust Collision Detection**: The game accurately detects wall crashes and self-cannibalization.
- **Bug-Free Board Spawning**: Food is algorithmically guaranteed to never spawn inside the snake's body.
- **Retro Aesthetic**: Custom CSS grid playing board, vintage color palette, and classic VT323 pixel font.

## 🛠️ Built With
- **HTML5**: Semantic structure.
- **CSS3**: CSS Grid for the 20x20 game board, Flexbox for layout centering, and custom visual borders to mimic an old-school handheld console.
- **JavaScript (ES6+)**: 
  - `setInterval` for the core game tick loop.
  - Array manipulation (`unshift`, `pop`, `forEach`) for managing the snake's body segments.
  - Spread syntax (`...`) for cloning positional objects safely.
  - Event Listeners for handling real-time `ArrowKey` inputs.

## 🧠 What I Learned / Practiced
- **2D Grids in the DOM**: Translating JavaScript X/Y coordinate objects into CSS Grid Columns and Rows.
- **State Management**: Keeping track of `direction`, `gameSpeed`, `gameStarted`, and `highScore` variables and ensuring they reset properly on Game Over.
- **Edge-Case Handling**: Implementing logic to prevent the player from instantly reversing direction (e.g., pressing "Down" while moving "Up") and immediately dying.
- **Performance**: Clearing the board `innerHTML` and redrawing strictly what is necessary each frame without causing browser memory leaks.

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) Frontend Engineering Portfolio.*
