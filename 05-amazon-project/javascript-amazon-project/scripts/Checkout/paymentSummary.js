import {cart} from "../../data/cart.js";
import {getMatchingProduct} from "../../data/products.js";
export function renderPaymentSummary() {
    let html = "";

    cart.forEach(cartItem => {
        const matchingProduct = getMatchingProduct(cartItem.productId);
        
    });
}