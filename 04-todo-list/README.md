# 04 – To-Do List

An interactive to-do list where users add tasks with a due date and delete them when done.

## Live Demo
[Open ↗](https://adityashahhhwal.github.io/learning-2025/04-todo-list/)

## Features
- Add a task with a **name** and a **due date** (both fields required)
- Inline validation — shows a red error message if either field is empty
- Delete individual tasks with a per-row Delete button
- List re-renders from the source array after every add or delete

## Built With
- HTML5
- CSS3
- Vanilla JavaScript

## How It Works
- Tasks live in a plain JS array `todoList = []` (in-memory, not persisted)
- `addTask()` validates input, pushes `{ name, dueDate }` to the array, then calls `renderTodoList()`
- `renderTodoList()` clears `innerHTML` and rebuilds every `<li>` from scratch using `createElement` and `append`
- `deleteTask(index)` uses `splice(index, 1)` then re-renders

## What I Practiced
- **Array-as-source-of-truth** — the DOM is always derived from `todoList`, never patched directly
- **`createElement` + `append`** — building DOM nodes programmatically rather than template strings
- **Input validation** — checking both `name` and `dueDate` before allowing an add
- **`splice`** — removing an item by index from a live array

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) portfolio.*
