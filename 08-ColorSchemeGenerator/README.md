# 08 – Color Scheme Generator

A pixel-perfect color palette tool that fetches harmonious color schemes from a live API and lets users copy hex values to their clipboard.

## Live Demo
[Open ↗](https://adityashahhhwal.github.io/learning-2025/08-ColorSchemeGenerator/)

## Features
- Pick any seed color with the native color picker
- Choose from 8 harmony modes: Monochrome, Monochrome-dark, Monochrome-light, Analogic, Complement, Analogic-complement, Triad, Quad
- Fetches a 5-color palette from [TheColorAPI](https://www.thecolorapi.com/)
- Click any hex label to copy it to clipboard — label flips to "Copied" with visual feedback
- **Dark / Light mode toggle** with a smooth animated icon spin and a crossfade theme transition
- Fully responsive — layout adapts cleanly to any screen width
- Pixe-perfect Figma implementation (header, palette columns, hex footer)

## Built With
- HTML5
- CSS3 (Flexbox, `@keyframes`, CSS custom transitions)
- Vanilla JavaScript (ES6, Fetch API, Clipboard API)
- [TheColorAPI](https://www.thecolorapi.com/) — free color scheme endpoint
- [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Project Structure
```
08-ColorSchemeGenerator/
  index.html                     — page structure
  Color-Scheme-Generator.css     — all styles including dark mode
  Color-Scheme-Generator.js      — fetch, render, clipboard, theme toggle
  theme_light.png                — sun icon for light mode toggle
  theme_dark.png                 — moon icon for dark mode toggle
```

## What I Practiced
- **Fetch API** — async `fetch → .then` chain, parsing JSON, mapping response data to DOM
- **Clipboard API** — `navigator.clipboard.writeText()` with Promise-based feedback
- **CSS animations** — `@keyframes spin-once`, `cubic-bezier` easing, `animationend` event
- **Dark mode** — `body.dark` class approach with `transition` on all themed elements for a smooth crossfade
- **Figma → Code** — translating exact Figma specs (position, size, typography, shadow) into CSS

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) portfolio.*
