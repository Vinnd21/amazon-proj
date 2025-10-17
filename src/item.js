import { renderSummary, renderItemQuantity } from './shopping-cart.js';
export class Item {
    constructor(img, name, price, quantity = 1) {
        this.img = img;
        this.name = name.trim();
        this.price = parseFloat(price);
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
        const existingItemIndex = cart.findIndex(
            (item) => item.name.trim().toLowerCase() === this.name.toLowerCase()
        );
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += this.quantity;
        } else {
            cart.push({
                img: this.img,
                name: this.name,
                price: this.price,
                quantity: this.quantity
            });
        }
        this.setLocalCart(cart);
        // update quantity displays
        if (typeof renderItemQuantity === 'function') renderItemQuantity();
    }

    removeFromCart() {
        let cart = this.parseCart();
        cart = cart.filter(item => item.name !== this.name);
        this.setLocalCart(cart);
        if (typeof renderItemQuantity === 'function') renderItemQuantity();
    }

    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
        let cart = this.parseCart();
        const itemIndex = cart.findIndex(item => item.name === this.name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = newQuantity;
            this.setLocalCart(cart);
            if (typeof renderItemQuantity === 'function') renderItemQuantity();
        }
    }
}


export function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    cart.forEach((item, index ) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
          <h3 style="color: #007600; font-size: 18px; margin-top: 0; margin-bottom: 20px;">Delivery date: Friday, September 19</h3>  
            <div style="display: grid; grid-template-columns: 150px 1fr 1fr; gap: 20px; align-items: start;">
                <div>
                    <img src=${item.img} alt="Athletic Socks" style="width: 100%; border-radius: 4px;">
                </div>
                <div>
                    <h4 style="font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">${item.name}</h4>
                    <p style="color: #b12704; font-size: 18px; font-weight: bold; margin: 5px 0;">$${(item.price * item.quantity).toFixed(2)}</p>
                    <p style="font-size: 14px; margin: 5px 0;">Qty: <span class="item-qty">${item.quantity}</span>
                        <button data-name="${item.name}" class="update-qty" style="color: #007185; text-decoration: none; margin-left: 10px;">Update</button>
                        <button data-name="${item.name}" class="delete" style="color: #007185; text-decoration: none; margin-left: 10px;">Delete</button>
                    </p>
                </div>
                <div>
                    <p style="font-weight: bold; margin: 0 0 15px 0;">Choose a delivery option:</p>
                        <label style="display: flex; align-items: start; gap: 10px; margin-bottom: 15px; cursor: pointer;">
                            <input type="radio" name="delivery1" checked style="margin-top: 3px;">
                            <div>
                                <div style="color: #007600; font-weight: bold;">Friday, September 19</div>
                                <div style="color: #888; font-size: 14px;">FREE Shipping</div>
                            </div>
                        </label>
                            
                        <label style="display: flex; align-items: start; gap: 10px; margin-bottom: 15px; cursor: pointer;">
                            <input type="radio" name="delivery1" style="margin-top: 3px;">
                            <div>
                                <div style="color: #007600; font-weight: bold;">Monday, September 15</div>
                                <div style="color: #888; font-size: 14px;">$4.99 - Shipping</div>
                            </div>
                        </label>
                            
                        <label style="display: flex; align-items: start; gap: 10px; cursor: pointer;">
                            <input type="radio" name="delivery1" style="margin-top: 3px;">
                            <div>
                                <div style="color: #007600; font-weight: bold;">Thursday, September 11</div>
                                <div style="color: #888; font-size: 14px;">$9.99 - Shipping</div>
                            </div>
                        </label>
                </div>
            </div>`;
        cartContainer.appendChild(itemDiv);
    });
        // Update quantity button
        document.querySelectorAll('.update-qty').forEach((button) => {
                button.addEventListener('click', (e) => {
                        const name = e.currentTarget.dataset.name;
                        const cart = JSON.parse(localStorage.getItem('cart')) || [];
                        const itemIndex = cart.findIndex(it => it.name === name);
                        if (itemIndex === -1) return;
                        const currentQty = Number(cart[itemIndex].quantity) || 1;
                        const newQtyStr = prompt('Enter new quantity for "' + name + '"', String(currentQty));
                        const newQty = parseInt(newQtyStr, 10);
                        if (!isNaN(newQty) && newQty > 0) {
                                cart[itemIndex].quantity = newQty;
                                localStorage.setItem('cart', JSON.stringify(cart));
                                renderCart();
                                renderSummary();
                        }
                });
        });

        // Delete button
        document.querySelectorAll('.delete').forEach((button) => {
                button.addEventListener('click', (e) => {
                        const name = e.currentTarget.dataset.name;
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart = cart.filter(it => it.name !== name);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        renderCart();
                        renderSummary();
                });
        });

}




export function attachAddCartButtons() {
    const addCartButtons = document.querySelectorAll('.add-cart-btn');
    addCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const img = document.querySelectorAll('.product-image')[index] && document.querySelectorAll('.product-image')[index].src;
            const name = document.querySelectorAll('.product-name')[index] && document.querySelectorAll('.product-name')[index].innerText.trim();
            const pricetext = document.querySelectorAll('.product-price')[index] && document.querySelectorAll('.product-price')[index].innerText.trim();
            const price = pricetext ? pricetext.replace(/[^0-9.]/g, '').trim() : '0';
            const item = new Item(img, name, price, 1);
            item.addToCart();
            if (document.getElementById('.cartContainer')) renderCart();
            if (document.getElementById('.order-summary-container')) renderSummary();
            console.log(`${item.name} added to cart!`);
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('order-summary-container')) {
        renderSummary();
    }
    if (document.getElementById('cartContainer')) {
        renderCart();
    }
});
