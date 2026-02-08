import {cart , addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

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
              src="images/ratings/rating-${product.rating.stars*10}.png">
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

// Helper function to calculate total cart quantity
function updateCartQuantity() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);   // sum = accumulator, item = current value in the array
    document.querySelector('.js-cart-quantity').textContent = total;
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
        const productId = button.dataset.productId; // Get the product ID from the button's data attribute
        const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`); // Get the corresponding quantity selector for the clicked button
        const addedMessage = document.querySelector(`.js-added-to-cart[data-product-id="${productId}"]`); // Get the corresponding "Added to Cart" message element for the clicked button

        addToCart(productId, parseInt(quantitySelector.value));
        updateCartQuantity();      
        showAddedMessage(productId, addedMessage);      
    });
});




