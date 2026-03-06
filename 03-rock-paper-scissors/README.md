# 03 – Rock Paper Scissors

A Rock Paper Scissors game with Auto Play, keyboard shortcuts, and persistent score — all in Vanilla JavaScript.

## Live Demo
[Open ↗](https://adityashahhhwal.github.io/learning-2025/03-rock-paper-scissors/)

## Features
- **Play manually** — click the Rock / Paper / Scissors emoji buttons
- **Keyboard shortcuts** — press `r`, `p`, or `s` to play instantly
- **Auto Play** — starts a `setInterval` that plays a move every second automatically; button toggles to "Stop Auto"
- **Running score** — wins / losses / ties tracked and displayed each round
- **Persistent score** — saved to `localStorage` as JSON, survives page refresh
- **Reset Score** — clears the score (and stops Auto Play if running) with a brief button flash animation
- **Result messages** — shows round outcome and both moves after every play

## Built With
- HTML5
- CSS3
- Vanilla JavaScript (ES6)

## What I Practiced
- **`Math.random()`** for the computer's move
- **`setInterval` / `clearInterval`** to build the Auto Play loop
- **`keydown` event listener** on `document.body` for keyboard input
- **`localStorage`** with `JSON.parse` / `JSON.stringify` for score persistence
- **Boolean state flag** (`isAutoPlaying`) to toggle between modes cleanly
- **`setTimeout`** for a timed CSS flash animation on the reset button

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) portfolio.*
