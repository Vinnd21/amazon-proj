import { Item } from './item.js';
export class ShoppingCart {
    constructor( price, quantity = 1, taxRate= 0.1) {
        this.price = parseFloat(price);
        this.quantity = quantity
        this.taxRate = taxRate
        this.taxAmount = this.calculateTax();
        this.totalWithTax = this.calculateTotalWithTax();

    }
    calculateTax(){
        return this.price * this.taxRate;
    }
    calculateTotalWithTax() {
        return (this.price + this.taxAmount) * this.quantity;
    }
}

function renderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryContainer = document.getElementById('order-summary-container');
    if (!summaryContainer) return;

    summaryContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = new Item(item.img, item.name, item.price, item.quantity);
        const shoppingCart = new ShoppingCart(item.taxAmount, item.totalWithTax,);
        const itemSummary = document.createElement('div');
        itemSummary.innerHTML = `
            <div class="order-summary">
          <h2 class="order-summary-title">Order Summary</h2>

          <div class="summary-section">
            <div class="summary-row">
              <span class="summary-label">Items (${item.quantity}):</span>
              <span class="summary-value">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Shipping & handling:</span>
              <span class="summary-value">$4.99</span>
            </div>
          </div>

          <div class="summary-section">
            <div class="summary-row">
              <span class="summary-label">Total before tax: ${(item.price * item.quantity).toFixed(2)}</span>
              <span class="summary-value">$${shoppingCart.totalWithTax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Estimated tax (10%):</span>
              <span class="summary-value">$${shoppingCart.taxAmount.toFixed(2)}</span>
            </div>
          </div>

          <div class="order-total-section">
            <div class="order-total-row">
              <span class="order-total-label">Order total:</span>
              <span class="order-total-value">$${shoppingCart.totalWithTax.toFixed(2)}</span>
            </div>
          </div>

          <button class="place-order-btn">Place your order</button>
        `;
        summaryContainer.appendChild(itemSummary);
        document.querySelectorAll(".summary-value, .summary-label").forEach((input) => {
        input.addEventListener("change", (e) => {
        const index = e.target.dataset.index;
        const newQuantity = parseInt(e.target.value);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart[index]) {
            cart[index].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderSummary(); 
        }
        });
    });
    });

