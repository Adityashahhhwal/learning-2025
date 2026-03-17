<div align="center">

# Learning 2025 – Software Engineering Portfolio

<strong>A project-based journey focused on full-stack development, algorithms, and clean software architecture.</strong><br/>
<p>
  <img alt="C++" src="https://img.shields.io/badge/C++-00599C?logo=c%2B%2B&logoColor=white" />
  <img alt="Java" src="https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white" />
</p>

[Live Project Hub ↗](https://adityashahhhwal.github.io/learning-2025/)

</div>

---

## Recruiter Snapshot

- **Education:** B.Tech in Computer Science Engineering, AKTU University (Expected 2028)
- **Target roles:** Software Engineer / Full Stack Developer
- **Problem Solving:** Actively practicing DSA on LeetCode (50+ problems solved across arrays, strings, DP, and recursion).
- **Core Competencies:** Data Structures & Algorithms, Object-Oriented Programming (OOP), Full-Stack Architecture, RESTful APIs, and Database Management.
- **What this repo demonstrates:** A track record of shipping real features, consistent iteration, resolving complex bugs, and writing maintainable code based on core CS fundamentals.
- **Status:** Active

---

## Featured Work

### 1) Amazon-Style E-commerce UI

**Live:**
https://adityashahhhwal.github.io/learning-2025/05-amazon-project/javascript-amazon-project/amazon.html

**Key engineering highlights:**
- Dynamic product rendering from structured product data
- Cart state persisted in `localStorage`
- Checkout flow with editable quantity, item removal, and delivery-option updates
- Delivery ETA calculation using business-day logic (`dayjs`)
- Payment summary pipeline (items, shipping, tax, total)
- Modular structure with separated data, checkout, and utility logic

**Artifacts:**
- [Checkout Screenshots (PDF)](05-amazon-project/javascript-amazon-project/scripts/utils/Checkout.pdf)
- [Amazon Project Screenshots (PDF)](05-amazon-project/javascript-amazon-project/scripts/utils/Amazon%20Project.pdf)

### 2) Color Scheme Generator (API & Theming)

**Live:**
https://adityashahhhwal.github.io/learning-2025/08-ColorSchemeGenerator/

**Key engineering highlights:**
- **Live API Integration**: Fetches harmonious color palettes from [TheColorAPI](https://www.thecolorapi.com/) based on user seed color and mode.
- **Advanced State Management**: Handles 8 different harmony modes (Monochrome, Analogic, Triad, etc.) and clipboard interactions.
- **Dark/Light Mode Engine**: animated toggle icon with crossfade effects and persistent theme application.
- **Pixel-Perfect CSS**: Flexbox layouts that adapt strictly to a Figma design spec.

### 3) JavaScript Snake Game (Algorithmic Logic)

**Live:**
https://adityashahhhwal.github.io/learning-2025/07-js-game/

**Key engineering highlights:**
- Built a custom **game-loop engine** using `setInterval` with scaling difficulty (speed scaling).
- Implemented **Grid-based collision detection** algorithms to handle wall crashes and self-cannibalization.
- Solved recursive edge-cases, guaranteeing food spawns dynamically without overlapping the snake's current coordinates.
- Managed complex game state (score, high score, directional inputs, active status) completely in Vanilla JS.
- Cleanly mapped 2D JavaScript array coordinates to dynamic CSS Grid positions for high-performance DOM rendering to minimize layout thrashing.

### 4) Portfolio Hub Interface (Repository Root)

**Live:**
https://adityashahhhwal.github.io/learning-2025/

**Key engineering highlights:**
- **Custom Cursor System**: Implemented a performant, lag-free "ball" cursor with a trailing "shooting star" effect using `requestAnimationFrame`.
- **Advanced Color Theory**: Applied a **Split-Complementary** color scheme (Warm Orange #28deg & Deep Blue-Grey #215deg) for high-contrast, harmonious visuals.
- **Interactive UI**: Elements feature ripple animations and dynamic hover states that blend with the custom cursor.
- **Responsive Design**: Mobile-first architecture with touch-friendly adaptations (disabling custom cursor on touch devices) and optimized grid layouts.
- **Modern Typography**: Integrated Apple's system font stack (San Francisco/Helvetica Neue) for a premium, clean aesthetic.

---

## Project List

| Project | Live Demo | Skills Demonstrated |
|---|---|---|
| DOM Interactions | https://adityashahhhwal.github.io/learning-2025/01-dom/ | Event handling, class toggling, DOM updates |
| Simple Calculator | https://adityashahhhwal.github.io/learning-2025/02-calculator/ | Input handling, state updates, arithmetic logic |
| Rock Paper Scissors | https://adityashahhhwal.github.io/learning-2025/03-rock-paper-scissors/ | Conditional logic, score flow, UI updates |
| To-Do List | https://adityashahhhwal.github.io/learning-2025/04-todo-list/ | Dynamic rendering, list state management |
| Amazon Project | https://adityashahhhwal.github.io/learning-2025/05-amazon-project/javascript-amazon-project/amazon.html | Modular JS architecture, cart + checkout logic |
| Portfolio Site | https://adityashahwal.me | Responsive UI, theming, content presentation |
| Javascript Snake Game | https://adityashahhhwal.github.io/learning-2025/07-js-game/ | Game loops, 2D Arrays, Collision Algorithms, State Management |
| Color Scheme Generator | https://adityashahhhwal.github.io/learning-2025/08-ColorSchemeGenerator/ | Fetch API, dark mode, CSS animations, clipboard API |

---

## Recent Commit-Based Progress (Mar 2026)

- **2026-03-06:** Built `08-ColorSchemeGenerator` — fetches 5-color palettes from the TheColorAPI, dark/light mode toggle with spin animation, clipboard copy with visual feedback, and pixel-perfect Figma implementation.
- **2026-02-22:** Debugged and polished `07-js-game` (Snake Game) logic, including wall collisions, preventing self-cannibalization, ensuring food doesn't spawn on the snake body, and adding a persistent High Score tracking feature.
- **2026-02-13:** Portfolio improvements (layout/content/style polish), theme toggle enhancements, and code readability refactors
- **2026-02-12:** Added async cart loading path and started object-oriented cart structure exploration (`cartOop.js`)
- **2026-02-10 to 2026-02-11:** Refactored checkout payment summary and integrated product + delivery calculations
- **2026-02-09:** Shipped checkout delivery options, order summary flow, and cart quantity update/normalization improvements

This commit trail highlights practical iteration, debugging, and refactoring discipline rather than one-time uploads.

---

## Technical Skills

- **Languages:** C++, Java, JavaScript (ES6+)
- **Frontend Frameworks:** React, Next.js, HTML5, CSS3
- **Backend & Database:** Node.js, Express, MongoDB
- **Core CS:** Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, OOP
- **Tools:** Git, GitHub, Deployment (Domain routing + HTTPS)

---

## Local Setup

1. Clone the repository.
2. Open the root folder in VS Code.
3. Run any project using a local server (for example, Live Server).

---

## Active & Upcoming Projects

- **Disaster Management Platform:** Designing a structured disaster response interface with scalable frontend components and modular architecture.
- **Finance Tracker Application:** Developing a full-stack personal finance tracking system using Node.js and MongoDB with RESTful API integration.
- **Advanced DSA:** Continuing to solve Medium and Hard-level algorithmic problems on LeetCode.

---

## Contact

- GitHub: [@Adityashahhhwal](https://github.com/Adityashahhhwal)
- LinkedIn: https://www.linkedin.com/in/aditya-shahwal-7b27a2314
- Email: adityashahwal2005@gmail.com

---

<sub>Open to Software Engineering internships and collaborative open-source projects.</sub>
