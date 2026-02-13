import {addToCart, getCartQuantity} from '../data/cart.js';
import {products, loadProductsFetch} from '../data/products.js';

loadProductsFetch().then(() => {

let productHTML = '';

products.forEach((product) =>{
    productHTML += `        
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}"> 
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product. rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector" data-product-id ="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart" data-product-id="${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
})

document.querySelector('.js-products-grid').innerHTML = productHTML;

function updateCartQuantity() {
    const total = getCartQuantity();
    document.querySelector('.js-cart-quantity').textContent = total === 0 ? '' : `${total}`;
}



// Store timeout IDs for each product
const addedMessageTimeouts = {};

// Helper function to show "Added" message with auto-hide after 2 seconds
function showAddedMessage(productId, addedMessage) {
    // Clear previous timeout if it exists (resets the timer)
    if (addedMessageTimeouts[productId]) {
        clearTimeout(addedMessageTimeouts[productId]);
    }
    
    addedMessage.style.opacity = 1;

    // Set new timeout and store its ID
    addedMessageTimeouts[productId] = setTimeout(() => {
        addedMessage.style.opacity = 0;
    }, 2000);
}

// Add to cart functionality
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId; 
        const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`); 
        const addedMessage = document.querySelector(`.js-added-to-cart[data-product-id="${productId}"]`); 
        addToCart(productId, parseInt(quantitySelector.value));
        updateCartQuantity();      
        showAddedMessage(productId, addedMessage);      
    });
});

// Update cart quantity on page load
updateCartQuantity();

}); // end loadProductsFetch

