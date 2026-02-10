import {cart} from "../../data/cart.js";
import {getMatchingProduct} from "../../data/products.js";
import { getMatchingDeliveryOption,formatPrice, defaultDeliveryOptionId } from "./orderSummary.js";

export function renderPaymentSummary() {
    let html = "";

    let itemValue = 0;
    let shippingCharge = 0;
    let cartItemCount = 0;


    cart.forEach(cartItem => {
        const matchingProduct = getMatchingProduct(cartItem.productId);
        const deliveryOptionId = cartItem.deliveryOptionId || defaultDeliveryOptionId;
        const matchingDeliveryOption = getMatchingDeliveryOption(deliveryOptionId);
        shippingCharge += matchingDeliveryOption.priceCents;
        itemValue += matchingProduct.priceCents * cartItem.quantity;
        cartItemCount += cartItem.quantity;
    });
    let beforetaxPrice = shippingCharge + itemValue;
    html = `
              <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartItemCount}):</div>
        <div class="payment-summary-money">${formatPrice(itemValue)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${formatPrice(shippingCharge)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${formatPrice(beforetaxPrice)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${formatPrice(beforetaxPrice * 0.1)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${formatPrice(beforetaxPrice * 1.1)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;
    return html;
}


