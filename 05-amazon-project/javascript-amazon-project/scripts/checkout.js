import { renderCheckoutPage, setOnUpdate } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProductsFetch } from '../data/products.js';

loadProductsFetch().then(() => {
  function updatePaymentSummary() {
    document.querySelector(".js-payment-summary").innerHTML = renderPaymentSummary();
  }

  setOnUpdate(updatePaymentSummary);
  renderCheckoutPage();
});

// This file serves as the entry point for the checkout page
