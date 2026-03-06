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
  products.js        — OOP Product/Clothing classes, fetch-based loader, lookup helpers
  cart.js            — cart state, localStorage persistence, quantity normalisation, XHR loadCart
  deliveryOptions.js — shipping option definitions
scripts/
  amazon.js          — renders catalog from fetched products, handles add-to-cart
  checkout.js        — entry point: wires setOnUpdate + renderCheckoutPage
  Checkout/
    orderSummary.js  — renders cart rows and delivery choices, exposes setOnUpdate hook
    paymentSummary.js — computes items / shipping / tax / total from live cart state
```

## Key Engineering Highlights
- **OOP product model** — `Product` base class and `Clothing` subclass (`extraInfoHTML`, `getPrice`, `getStarsUrl`) defined in `products.js`
- **State-first, render-after** — mutate cart state via `cart.js` helpers (`addToCart`, `removeCartItem`, `updateDeliveryOption`), then re-render
- **`setOnUpdate` hook** — `orderSummary.js` exposes a callback slot that `checkout.js` fills with `renderPaymentSummary`, keeping the two modules decoupled
- **`normalizeQuantity`** — clamps input to 1–10, floors decimals, returns `0` to signal a removal
- **Business-day delivery ETA** — calculated with `dayjs` (loaded via ESM CDN)
- **Dual async patterns** — `loadProductsFetch` (Fetch + Promises) and `loadCart` (XHR) both used, demonstrating old and new approaches side by side
- **`localStorage`** — cart persisted as JSON, survives page refreshes
- **`data-*` / `js-*` conventions** — DOM hooks are decoupled from style classes

## Built With
- HTML5 / CSS3
- Vanilla JavaScript (ES Modules)
- [dayjs](https://day.js.org/) for date arithmetic
- Backend API: `https://supersimplebackend.dev`

---
*Part of the [Learning 2025](https://github.com/Adityashahhhwal/learning-2025) portfolio.*
