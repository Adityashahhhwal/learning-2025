# Copilot Instructions for `learning-2025`

## Repo shape and intent
- This is a static, multi-project learning portfolio. Each numbered folder is a standalone frontend project.
- Root `index.html` is a simple hub page linking into project folders.
- Most projects are plain HTML/CSS/JS; no Node build system or package manager is used.

## Project boundaries
- `01-dom`, `02-calculator`, `03-rock-paper-scissors`, `04-todo-list`: independent browser apps with direct DOM scripting.
- `05-amazon-project/javascript-amazon-project`: the most structured app, using ES modules and separated data/render logic.
- `06-portfolio-project`: single-page portfolio with responsive navigation and theme persistence.

## Amazon project architecture (primary complex area)
- Entry points:
  - `scripts/amazon.js` renders catalog and handles add-to-cart interactions.
  - `scripts/checkout.js` wires checkout rendering and payment summary updates.
- Data modules (`data/`):
  - `cart.js` manages cart state, persistence, quantity normalization, delivery option updates.
  - `products.js` fetches products from backend and exposes product lookups.
  - `deliveryOptions.js` defines shipping options.
- Checkout rendering (`scripts/Checkout/`):
  - `orderSummary.js` renders cart rows and delivery choices, then re-renders on user actions.
  - `paymentSummary.js` computes totals from `cart` + product + delivery data and returns HTML.

## Data flow patterns to preserve
- State-first, render-after updates:
  - Mutate cart state through `cart.js` helpers.
  - Re-render affected UI sections instead of patching many DOM nodes manually.
  - In checkout, `renderCheckoutPage()` is the central refresh path.
- Cross-component update hook in checkout:
  - `setOnUpdate(callback)` in `orderSummary.js` is used by `checkout.js` to refresh payment summary after order-summary changes.
- DOM hooks use `js-` classes and `data-*` attributes consistently (for example `js-add-to-cart-button`, `data-product-id`).

## External integrations and dependencies
- Product/cart backend API: `https://supersimplebackend.dev/products` and `https://supersimplebackend.dev/cart`.
- Date library via ESM CDN import: `dayjs` in `scripts/Checkout/orderSummary.js`.
- Browser persistence: `localStorage` is used in multiple apps (`cart`, game score, portfolio theme).
- Google Fonts loaded directly in page HTML.

## Development workflow
- Local run: open HTML files with a local static server (Live Server in VS Code works well).
- For module-based pages (notably Amazon project), do not use `file://`; use HTTP local server so module imports load correctly.
- Deployment: GitHub Pages via workflow in `.github/workflows/static.yml` (uploads entire repository).
- No automated test suite is currently configured; validate by manual browser testing.

## Editing conventions in this repo
- Keep changes scoped to the target project folder; avoid cross-project refactors unless requested.
- Prefer existing naming and structure:
  - `script/` or `scripts/` for JS, `style/` or `styles/` for CSS, page HTML at folder root.
  - Event handlers typically attach after rendering dynamic HTML.
- In Amazon checkout, preserve helper boundaries (`formatPrice`, `getMatchingDeliveryOption`, `normalizeQuantity`) instead of duplicating logic.
- Keep CSS selectors and JS hooks stable (`js-*` classes are used by scripts).

## High-value files to read before non-trivial changes
- `README.md` for portfolio positioning and live links.
- `05-amazon-project/javascript-amazon-project/scripts/amazon.js`
- `05-amazon-project/javascript-amazon-project/scripts/checkout.js`
- `05-amazon-project/javascript-amazon-project/scripts/Checkout/orderSummary.js`
- `05-amazon-project/javascript-amazon-project/scripts/Checkout/paymentSummary.js`
- `05-amazon-project/javascript-amazon-project/data/cart.js`
- `06-portfolio-project/script.js`

## Agent tips for fast, safe edits
- Confirm whether a page is module-based before changing import paths.
- When changing checkout behavior, test these flows end-to-end:
  - add item on `amazon.html`
  - open `checkout.html`
  - update quantity
  - change delivery option
  - verify payment summary recalculates
- If adding a new project, also update root `index.html` project links.