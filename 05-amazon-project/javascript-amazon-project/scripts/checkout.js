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

let cartSummaryHTML = " ";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // Find the matching product from products array
  const matchingProduct = products.find((product) => product.id === productId);

  const deliveryOptionId = cartItem.deliveryOptionId || "1"; // Default to "1" if no delivery option selected
  const matchingDeliveryOption = deliveryOptions.find(
    (option) => String(option.id) === String(deliveryOptionId),
  );
  const defaultDeliveryDate = dayjs()
    .add(parseInt(matchingDeliveryOption.deliveryDays), "day")
    .format("dddd, MMMM D");

  if (matchingProduct) {
    cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${productId}">
                <div class="delivery-date js-delivery-date-${productId}">
                    Delivery date: ${defaultDeliveryDate}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${(matchingProduct.priceCents / 100).toFixed(2)}
                        </div>
                        <div class="product-quantity">
                            <span>Quantity: <span class="quantity-label">${cartItem.quantity}
                            </span>
                            </span>
                            <input class="quantity-input js-quantity-input" type="number" min="1" max="10" value="${cartItem.quantity}">    
                            <span class= "save-quantity-link link-primary js-save-quantity-link" data-product-id="${productId}"> Save </span> 
                            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productId}">Update</span> 
                            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${productId}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(productId, deliveryOptionId)}
                    </div>
                </div>
            </div>
        `;
  }
});
function renderDeliveryOption() {
  function deliveryOptionsHTML(productId, deliveryOptionId) {
    let deliveryOptionsHTML = "";

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today
        .add(parseInt(option.deliveryDays), "day")
        .format("dddd, MMMM D");
      const priceDollars =
        option.priceCents === 0
          ? "FREE Shipping"
          : `$${(option.priceCents / 100).toFixed(2)} - Shipping`;
      const isChecked =
        String(option.id) === String(deliveryOptionId) ? "checked" : "";
      deliveryOptionsHTML += `
                        <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${option.id}">
                            <input type="radio" ${isChecked} class="delivery-option-input" name="delivery-option-${productId}">
                            <div>
                                <div class="delivery-option-date">
                                    ${deliveryDate}
                                </div>
                                <div class="delivery-option-price">
                                    ${priceDollars}
                                </div>
                            </div>
                        </div>
                        `;
    });

    return deliveryOptionsHTML;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  function updateCartCount() {
    const totalItems = getCartQuantity();
    document.querySelector(".js-checkout-cart-count").innerHTML =
      `Checkout (<a class="return-to-home-link" href="amazon.html">${totalItems} items</a>)`;
  }

  updateCartCount();

  document
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteLink) => {
      deleteLink.addEventListener("click", () => {
        const productId = deleteLink.dataset.productId;
        removeCartItem(productId);
        window.location.reload(); // Reload page to update the display
      });
    });

  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateLink) => {
      updateLink.addEventListener("click", () => {
        const productId = updateLink.dataset.productId;
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`,
        );
        container.classList.add("is-editing-quantity");
      });
    });

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const productId = option.dataset.productId;
      const deliveryOptionId = option.dataset.deliveryOptionId;

      // Update the cart with the new delivery option
      updateDeliveryOption(productId, deliveryOptionId);

      // Find the matching delivery option to get delivery days
      const matchingOption = deliveryOptions.find(
        (opt) => String(opt.id) === String(deliveryOptionId),
      );
      const newDate = dayjs()
        .add(parseInt(matchingOption.deliveryDays), "day")
        .format("dddd, MMMM D");

      // Update the delivery date display
      document.querySelector(`.js-delivery-date-${productId}`).innerHTML =
        `Delivery date: ${newDate}`;

      // Update the checked radio button
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container
        .querySelectorAll(".delivery-option-input")
        .forEach((radio) => (radio.checked = false));
      option.querySelector(".delivery-option-input").checked = true;
    });
  });
}

renderdeliveryOption();

document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
  saveLink.addEventListener("click", () => {
    const productId = saveLink.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    const newQuantity = parseInt(
      container.querySelector(".js-quantity-input").value,
    );

    updateCartItemQuantity(productId, newQuantity);

    // Update the displayed quantity label
    container.querySelector(".quantity-label").textContent = newQuantity;

    // Update the cart count in the header
    updateCartCount();

    container.classList.remove("is-editing-quantity");
  });
});
