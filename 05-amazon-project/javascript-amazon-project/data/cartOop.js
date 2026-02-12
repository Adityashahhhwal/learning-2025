

const cart = {
    cartItems : JSON.parse(localStorage.getItem('cartOop')) || [],

// Helper function to save cart to localStorage
saveToStorage() {
    localStorage.setItem('cartOop', JSON.stringify(this.cartItems));
 }
};  


