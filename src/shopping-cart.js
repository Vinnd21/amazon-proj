export class ShoppingCart {
    constructor(price, quantity = 1, taxRate = 0.1) {
        this.price = Number(price) || 0;
        this.quantity = Number(quantity) || 1;
        this.taxRate = Number(taxRate) || 0.1;
    }

    get taxAmount() {
        return (this.price * this.quantity) * this.taxRate;
    }

    get totalWithTax() {
        return (this.price * this.quantity) + this.taxAmount;
    }
}
export function renderItemQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, it) => sum + (Number(it.quantity) || 1), 0);

   
    const checkoutHeader = document.getElementById('NumItems');
    if (checkoutHeader) {
        
        const base = String(checkoutHeader.textContent || 'Checkout').replace(/\s*\(.*\)$/, '').trim();
        checkoutHeader.textContent = `${base} (${total})`;
    }
    const cartAnchor = document.querySelector('.numItens');
    if (cartAnchor) {
    
        const badge = cartAnchor.querySelector('span:last-child');
        if (badge) badge.textContent = String(total);
    }
}
    
export function renderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryContainer = document.getElementById('order-summary-container');
    if (!summaryContainer) return;

    summaryContainer.innerHTML = '';

    if (cart.length === 0) {
        summaryContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    const itemsList = document.createElement('div');
    itemsList.className = 'summary-items';

    let totalBeforeTax = 0;
    cart.forEach((item, index) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const subtotal = price * quantity;
        totalBeforeTax += subtotal;

        const row = document.createElement('div');
        row.className = 'summary-row-item';
        row.innerHTML = `
            <div class="summary-row">
                <span class="summary-label">${item.name} x ${quantity}</span>
                <span class="summary-value">$${subtotal.toFixed(2)}</span>
            </div>
        `;
        itemsList.appendChild(row);
    });

    summaryContainer.appendChild(document.createElement('h2')).textContent = 'Order Summary';
    summaryContainer.appendChild(itemsList);

    const shipping = 4.99;
    const taxRate = 0.1; 
    const tax = totalBeforeTax * taxRate;
    const total = totalBeforeTax + tax + shipping;

    const totals = document.createElement('div');
    totals.className = 'summary-totals';
    totals.innerHTML = `
        <div class="summary-section">
            <div class="summary-row"><span>Total before tax:</span><span>$${totalBeforeTax.toFixed(2)}</span></div>
            <div class="summary-row"><span>Estimated tax (10%):</span><span>$${tax.toFixed(2)}</span></div>
            <div class="summary-row"><span>Shipping & handling:</span><span>$${shipping.toFixed(2)}</span></div>
            <div class="summary-row"><strong>Order total:</strong><strong>$${total.toFixed(2)}</strong></div>
        </div>
        <button class="place-order-btn">Place your order</button>
    `;

    summaryContainer.appendChild(totals);
}
