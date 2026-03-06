# 02 – Simple Calculator

A browser calculator that builds a mathematical expression string and evaluates it, with the last calculation persisted across page refreshes.

## Live Demo
[Open ↗](https://adityashahhhwal.github.io/learning-2025/02-calculator/)

## Features
- Digit buttons (0–9), operators (+, -, *, /), decimal point
- `=` evaluates the full expression
- Clear button resets the display and removes the saved state
- Expression is saved to `localStorage` so it survives a page refresh

## Built With
- HTML5
- CSS3
- Vanilla JavaScript

## How It Works
- Each button press appends its value to a `calculation` string (`addToCalculation`)
- `calculateResult()` calls `eval(calculation)` to produce the result
- `localStorage` is used to persist the current expression between sessions

> **Note:** `eval()` is used here intentionally as a learning exercise. The code itself includes a comment noting it should not be used in real-world projects due to security risks.

## What I Practiced
- `localStorage.setItem` / `getItem` / `removeItem` for simple state persistence
- Building and mutating a string to represent a live expression
- Separating `addToCalculation`, `calculateResult`, and `clearCalculation` into distinct functions

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) portfolio.*
