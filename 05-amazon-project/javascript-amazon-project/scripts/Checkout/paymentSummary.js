import { cart } from "../../data/cart.js";
import { getMatchingProduct } from "../../data/products.js";
import {
  getMatchingDeliveryOption,
  formatPrice,
  defaultDeliveryOptionId,
} from "./orderSummary.js";

export function renderPaymentSummary() {
  let itemValueCents = 0, shippingCents = 0, cartItemCount = 0;

  // Calculate totals from cart items
  cart.forEach((cartItem) => {
    const matchingProduct = getMatchingProduct(cartItem.productId);
    const deliveryOptionId = cartItem.deliveryOptionId || defaultDeliveryOptionId;
    const matchingDeliveryOption = getMatchingDeliveryOption(deliveryOptionId);

    shippingCents += matchingDeliveryOption.priceCents;
    itemValueCents += matchingProduct.priceCents * cartItem.quantity;
    cartItemCount += cartItem.quantity;
  });

  const beforeTaxCents = itemValueCents + shippingCents;
  const taxCents = beforeTaxCents * 0.1;
  const totalCents = beforeTaxCents + taxCents;

  return `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartItemCount}):</div>
      <div class="payment-summary-money">${formatPrice(itemValueCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">${formatPrice(shippingCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">${formatPrice(beforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">${formatPrice(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${formatPrice(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
}


