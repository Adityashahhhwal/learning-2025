import {
  cart,
  removeCartItem,
  updateCartItemQuantity,
  getCartQuantity,
  updateDeliveryOption,
  normalizeQuantity,
} from "../../data/cart.js";
import { getMatchingProduct } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const orderSummaryElement = document.querySelector(".js-order-summary"); // Element to display the order summary in the checkout page
const checkoutCartCountElement = document.querySelector(
  ".js-checkout-cart-count",
); // Element to display the cart count in the checkout header
export const defaultDeliveryOptionId = String(deliveryOptions[0]?.id ?? "1"); // Fallback to "1" if deliveryOptions is empty or doesn't have an id

let _onUpdate = null;

export function setOnUpdate(callback) {
  _onUpdate = callback;
}

export function formatPrice(cents) {
  return `$${(Math.round((cents ))/ 100).toFixed(2)}`;
}

export function getMatchingDeliveryOption(deliveryOptionId) {
  // Find the delivery option in the deliveryOptions list that matches the given deliveryOptionId, or return the default delivery option if not found
  return (
    deliveryOptions.find(
      (option) => String(option.id) === String(deliveryOptionId),
    ) || deliveryOptions[0]
  );
}

export function getDeliveryDate(deliveryDays) {
  let date = dayjs();
  let businessDaysLeft = Number.parseInt(deliveryDays, 10);

  while (businessDaysLeft > 0) {
    date = date.add(1, "day");
    const dayOfWeek = date.day(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDaysLeft--;
    }
  }

  return date.format("dddd, MMMM D");
}

function deliveryOptionsHTML(productId, selectedDeliveryOptionId) {
  // Generate the HTML for the delivery options for a given product, marking the selected delivery option as checked
  let html = "";

  deliveryOptions.forEach((option) => {
    const deliveryDate = getDeliveryDate(option.deliveryDays); // Calculate the delivery date based on the current date and the delivery days for the option
    const priceText =
      option.priceCents === 0
        ? "FREE Shipping"
        : `${formatPrice(option.priceCents)} - Shipping`;
    const isChecked =
      String(option.id) === String(selectedDeliveryOptionId) ? "checked" : ""; // Determine if this delivery option should be marked as checked based on whether its id matches the selectedDeliveryOptionId

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

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getMatchingProduct(productId);

    if (!matchingProduct) return;

    const deliveryOptionId =
      cartItem.deliveryOptionId || defaultDeliveryOptionId;
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
              <input id = "quantity-input-${productId}" class="quantity-input js-quantity-input" type="number" min="1" max="10" value="${cartItem.quantity}">
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

function handleDeliveryChange(productId, deliveryOptionId) {
  updateDeliveryOption(productId, deliveryOptionId);
  /* Handle the change of delivery option for a cart item by updating the delivery option in the cart data 
   and re-rendering the checkout page to reflect the change */
  renderCheckoutPage();
}

function handleSaveQuantity(productId) {
  /* Handle the saving of a cart item's quantity by normalizing the input quantity, updating the cart data, 
and re-rendering the checkout page to reflect the change. If the normalized quantity is 0, 
 the item is removed from the cart. */
  const container = orderSummaryElement.querySelector(
    `.js-cart-item-container-${productId}`,
  );
  if (!container) {
    return;
  }
  // Find the quantity input element within the cart item container to get the new quantity value entered by the user
  const quantityInput = container.querySelector(".js-quantity-input");
  const newQuantity = normalizeQuantity(quantityInput?.value);
  if (newQuantity <= 0) {
    removeCartItem(productId);
    renderCheckoutPage();
    return;
  }

  updateCartItemQuantity(productId, newQuantity); // Update the cart data with the new quantity for the specified productId
  renderCheckoutPage();
  container.querySelector(".quantity-label").textContent = newQuantity;
  updateCartCount();
  container.classList.remove("is-editing-quantity");
}

function attachOrderSummaryListeners() {
  document.querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteLink) => {
      deleteLink.addEventListener("click", () => {
        removeCartItem(deleteLink.dataset.productId);
        renderCheckoutPage();
      });
    });
/* Handle the start of editing a cart item's quantity by adding an "is-editing-quantity" class to the cart item container, which can be used to show/hide the quantity input and save button */
  document.querySelectorAll(".js-update-quantity-link") 
    .forEach((updateLink) => { 
      updateLink.addEventListener("click", () => {
        const container = orderSummaryElement.querySelector(
          `.js-cart-item-container-${updateLink.dataset.productId}`, // Find the container element for the cart item being edited based on the productId
        );
        if (container) {
          container.classList.add("is-editing-quantity");
        }
      });
    });
// Handle the saving of a cart item's quantity by normalizing the input quantity, updating the cart data, and re-rendering the checkout page to reflect the change. If the normalized quantity is 0, the item is removed from the cart.
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      handleDeliveryChange(
        option.dataset.productId, // Get the productId from the clicked delivery option's data attribute to identify which cart item is being updated
        option.dataset.deliveryOptionId, // Get the deliveryOptionId from the clicked delivery option's data attribute to identify which delivery option was selected
      );
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      handleSaveQuantity(saveLink.dataset.productId);
    });
  });
}

export function renderCheckoutPage() {
  renderOrderSummary();
  attachOrderSummaryListeners();
  if (_onUpdate) _onUpdate();
}


