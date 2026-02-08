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
    else cart.push({ productId, quantity });
    
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
    return cart.reduce((sum, item) => sum + item.quantity, 0);
} 