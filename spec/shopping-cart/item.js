class Item {
    constructor(quantity = 1) {
        this.img = document.querySelectorAll('.product-image');
        this.name = document.querySelectorAll('.product-name');
        this.price = document.querySelectorAll('.product-price');
        this.quantity = quantity;
    }

    parseCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    setLocalCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    addToCart() {
        let cart = this.parseCart();
        cart.push(this);
        this.setLocalCart(cart);
    }

    removeFromCart() {
        let cart = this.parseCart();
        cart = cart.filter(item => item.name !== this.name);
        this.setLocalCart(cart);
    }

    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
        let cart = this.parseCart();
        const itemIndex = cart.findIndex(item => item.name === this.name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = newQuantity;
            this.setLocalCart(cart);
        }
    }
}

function addToCart(index, button) { 
