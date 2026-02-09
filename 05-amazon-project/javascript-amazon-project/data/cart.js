// Load cart from localStorage, or use empty array if nothing saved
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Helper function to save cart to localStorage
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Helper function to add items to cart
export function addToCart(productId, quantity) {
    const existing = cart.find(item => item.productId === productId);

    if (existing) existing.quantity += quantity;   // If the product is already in the cart, increase its quantity        
    else cart.push({ productId, quantity, deliveryOptionId: '1' });
    
    saveToStorage(); // Save to localStorage after adding
}

export function removeCartItem(productId) {
    cart = cart.filter(item => item.productId !== productId); 
    saveToStorage(); // Save to localStorage after removing
}

export function updateCartItemQuantity(productId, newQuantity) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        saveToStorage(); // Save to localStorage after updating
    }
}

export function getCartQuantity() {
    return cart.reduce((sum, item) => sum + item.quantity, 0); // Sum up the quantity of all items in the cart 
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    }
}
export function normalizeQuantity(rawQuantity) {
  let quantity = Number(rawQuantity);

  if (!Number.isFinite(quantity)) quantity = 1; // Default to 1 if the input is not a valid number

  quantity = Math.floor(quantity);

  if (quantity <= 0) return 0; // Return 0 to indicate the item should be removed from the cart
  if (quantity > 10) return 10; // Cap quantity at 10

  return quantity;
}
