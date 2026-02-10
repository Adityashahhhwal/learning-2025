import {cart} from "../../data/cart.js";
import {getMatchingProduct,} from "../../data/products.js";

export function renderPaymentSummary() {
    let html = "";

    cart.forEach(cartItem => {
        const matchingProduct = getMatchingProduct(cartItem.productId);
        const priceText = formatPrice(matchingProduct.priceCents);
        const deliveryOptionId = cartItem.deliveryOptionId || defaultDeliveryOptionId;
        const matchingDeliveryOption = getMatchingDeliveryOption(deliveryOptionId);
        const deliveryDate = getDeliveryDate(matchingDeliveryOption.deliveryDays);
        
        html += `
        `
    });
}