# 05 – Amazon-Style E-commerce UI

A multi-page e-commerce application modelled on Amazon's shopping and checkout flow, built with modular Vanilla JavaScript and ES modules.

## Live Demo
[Shop ↗](https://adityashahhhwal.github.io/learning-2025/05-amazon-project/javascript-amazon-project/amazon.html) · [Checkout ↗](https://adityashahhhwal.github.io/learning-2025/05-amazon-project/javascript-amazon-project/checkout.html)

## Pages
| File | Purpose |
|---|---|
| `amazon.html` | Product catalog — browse and add items to cart |
| `checkout.html` | Order summary, delivery options, payment total |
| `orders.html` | Order history |
| `tracking.html` | Delivery tracking |

## Architecture
```
data/
  products.js        — fetches products from backend API, exposes lookup helpers
  cart.js            — cart state, localStorage persistence, quantity normalisation
  deliveryOptions.js — shipping option definitions
scripts/
  amazon.js          — renders catalog, handles add-to-cart
  checkout.js        — wires checkout rendering, payment summary updates
  Checkout/
    orderSummary.js  — renders cart rows, delivery choices, re-renders on changes
    paymentSummary.js — computes item/shipping/tax/total from live cart state
```

## Key Engineering Highlights
- **State-first, render-after** pattern — mutate state through `cart.js` helpers, then re-render
- **Cross-component update hook** — `setOnUpdate()` in `orderSummary.js` lets `checkout.js` refresh the payment summary after any order-summary change
- **Business-day delivery ETA** calculated with `dayjs` (loaded via ESM CDN)
- **`localStorage` persistence** — cart survives page refreshes
- **`data-*` / `js-*` conventions** — DOM hooks are stable and decoupled from style classes

## Built With
- HTML5 / CSS3
- Vanilla JavaScript (ES Modules)
- [dayjs](https://day.js.org/) for date arithmetic
- Backend API: `https://supersimplebackend.dev`

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) portfolio.*
