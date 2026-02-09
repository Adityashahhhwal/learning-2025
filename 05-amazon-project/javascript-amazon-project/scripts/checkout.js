import {
  cart,
  removeCartItem,
  updateCartItemQuantity,
  getCartQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const orderSummaryElement = document.querySelector(".js-order-summary"); 
const checkoutCartCountElement = document.querySelector(".js-checkout-cart-count");
const defaultDeliveryOptionId = String(deliveryOptions[0]?.id ?? "1");

function formatPrice(cents) {return `$${(cents / 100).toFixed(2)}`};


function getMatchingProduct(productId) {return products.find((product) => product.id === productId)}

function getMatchingDeliveryOption(deliveryOptionId) {
  return (
    deliveryOptions.find(
      (option) => String(option.id) === String(deliveryOptionId),
    ) || deliveryOptions[0]
  );
}

function getDeliveryDate(deliveryDays) {
  return dayjs()
    .add(Number.parseInt(deliveryDays, 10), "day")
    .format("dddd, MMMM D");
}

function normalizeQuantity(rawQuantity) {
  let quantity = Number(rawQuantity);

  if (!Number.isFinite(quantity)) quantity = 1; // Default to 1 if the input is not a valid number
  

  quantity = Math.floor(quantity);

  if (quantity <= 0) return 0; // Return 0 to indicate the item should be removed from the cart

  if (quantity > 10) return 10; // Cap quantity at 10
  
  return quantity; 
}

function deliveryOptionsHTML(productId, selectedDeliveryOptionId) {     
  let html = "";

  deliveryOptions.forEach((option) => {
    const deliveryDate = getDeliveryDate(option.deliveryDays);
    const priceText =
      option.priceCents === 0
        ? "FREE Shipping"
        : `${formatPrice(option.priceCents)} - Shipping`;
    const isChecked =
      String(option.id) === String(selectedDeliveryOptionId) ? "checked" : "";

    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${option.id}">
        <input type="radio" ${isChecked} class="delivery-option-input" name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">${deliveryDate}</div>
          <div class="delivery-option-price">${priceText}</div>
        </div>
      </div>
    `;
  });

  return html;
}

function updateCartCount() {
  const totalItems = getCartQuantity();
  checkoutCartCountElement.innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${totalItems} items</a>)`;
}

function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getMatchingProduct(productId);

    if (!matchingProduct) {
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId || defaultDeliveryOptionId;
    const matchingDeliveryOption = getMatchingDeliveryOption(deliveryOptionId);
    const deliveryDate = getDeliveryDate(matchingDeliveryOption.deliveryDays);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${productId}">
        <div class="delivery-date js-delivery-date-${productId}">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">${formatPrice(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <input class="quantity-input js-quantity-input" type="number" min="1" max="10" value="${cartItem.quantity}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${productId}"> Save </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productId}">Update</span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${productId}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(productId, deliveryOptionId)}
          </div>
        </div>
      </div>
    `;
  });

  orderSummaryElement.innerHTML = cartSummaryHTML;
  updateCartCount();
}

function handleDelete(productId) {
  removeCartItem(productId);
  renderCheckoutPage();
}

function handleStartEdit(productId) {
  const container = orderSummaryElement.querySelector(
    `.js-cart-item-container-${productId}`,
  );

  if (container) {
    container.classList.add("is-editing-quantity");
  }
}

function handleDeliveryChange(productId, deliveryOptionId) {
  updateDeliveryOption(productId, deliveryOptionId);
  renderCheckoutPage();
}

function handleSaveQuantity(productId) {
  const container = orderSummaryElement.querySelector(
    `.js-cart-item-container-${productId}`,
  );

  if (!container) {
    return;
  }

  const quantityInput = container.querySelector(".js-quantity-input");
  const newQuantity = normalizeQuantity(quantityInput?.value);

  if (newQuantity <= 0) {
    removeCartItem(productId);
    renderCheckoutPage();
    return;
  }

  updateCartItemQuantity(productId, newQuantity);
  container.querySelector(".quantity-label").textContent = newQuantity;
  updateCartCount();
  container.classList.remove("is-editing-quantity");
}

function attachOrderSummaryListeners() {
  document.querySelectorAll(".js-delete-quantity-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      handleDelete(deleteLink.dataset.productId);
    });
  });

  document.querySelectorAll(".js-update-quantity-link").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      handleStartEdit(updateLink.dataset.productId);
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      handleDeliveryChange(option.dataset.productId, option.dataset.deliveryOptionId);
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      handleSaveQuantity(saveLink.dataset.productId);
    });
  });
}

function renderCheckoutPage() {
  renderOrderSummary();
  attachOrderSummaryListeners();
}

renderCheckoutPage();
