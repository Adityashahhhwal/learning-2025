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