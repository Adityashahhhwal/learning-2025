# 01 – DOM Interactions

A minimal exercise demonstrating active-state toggling across a set of buttons using the DOM.

## Live Demo
[Open ↗](https://adityashahhhwal.github.io/learning-2025/01-dom/)

## What It Does
Three category buttons — **Gaming**, **Tech**, **Music**. Clicking one highlights it and removes the highlight from the others.

## What the Code Covers
- `querySelector` to grab elements by class
- `event.target` to identify the clicked element inside an `onclick` handler
- `classList.add` / `classList.remove` to toggle an active (`.clicked`) visual state
- Inline CSS styling in a self-contained single HTML file (no external stylesheet)

## Built With
- HTML5
- CSS3 (inline `<style>` block)
- Vanilla JavaScript (inline `<script>` block)

## Key Takeaway
This is the simplest possible DOM interaction pattern: listen for a click, identify what was clicked, update classes. Every more complex UI feature builds on this foundation.

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) portfolio.*
