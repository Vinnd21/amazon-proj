const ItemName = document.querySelectorAll('.name');
const ItemImg = document.querySelectorAll('.img');
const ItemPrice = document.querySelectorAll('.price');
const addCartButtons = document.querySelectorAll('.addCart');

function renderHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
    <div style="background-color: #131921; color: white; padding: 10px 20px;">
        <div style="display: flex; align-items: center; gap: 20px;">
            <div style="flex-shrink: 0;">
                <a href="/index.html" target="_blank" rel="noopener">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style="width: 100px; height: auto;">
                </a>
            </div>
            <div style="display: flex; align-items: center; gap: 5px; padding: 5px 10px; border: 1px solid transparent; cursor: pointer;">
                <span style="font-size: 12px;">Deliver to</span>
                <div>
                    <div style="font-weight: bold; font-size: 14px;"> United States</div>
                </div>
            </div>
            <div style="flex-grow: 1; display: flex;">
                <input type="text" placeholder="Search Amazon" style="flex-grow: 1; padding: 10px; border: none; outline: none; font-size: 14px;">
                <button style="background-color: #febd69; border: none; padding: 10px 20px; cursor: pointer;">
                    <span style="font-size: 18px;">🔍</span>
                </button>
            </div>
            <div style="display: flex; gap: 20px; align-items: center;">
                <div style="cursor: pointer;">
                    <div style="font-size: 12px;">Hello, Sign in</div>
                    <div style="font-weight: bold; font-size: 14px;">Account & Lists</div>
                </div>
                <div style="cursor: pointer;">
                    <div style="font-size: 12px;">Returns</div>
                    <div style="font-weight: bold; font-size: 14px;">& Orders</div>
                </div>
                <a href="/check.html" style="cursor: pointer; display: flex; align-items: center; position: relative; text-decoration: none; color: inherit;">
                    <span style="font-size: 24px;">🛒</span>
                    <span style="font-weight: bold; margin-left: 5px;">Cart</span>
                    <span style="
                        position: absolute;
                        top: -8px;
                        right: -12px;
                        background: #febd69;
                        color: #131921;
                        border-radius: 50%;
                        padding: 2px 7px;
                        font-size: 12px;
                        font-weight: bold;
                        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
                    ">1</span>
                </a>
            </div>
        </div>
    </div>
    `;
    document.body.prepend(header);
} 
renderHeader();

function onclickItem(){
    const iname = ItemName[index].innerText;
    const imgSrc = ItemImg[index].src;
    const price = ItemPrice[index].innerText; 
    const cartItem = { iname, imgSrc, price };
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(savedCart));
    console.log(`${iname} has been added to your cart.`);
}
function renderCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const Items = JSON.parse(imgSrc, iname, price);
        const cartContainer = document.getElementById('cartContainer');
        Items.forEach(item => {
        const itemDiv = document.createElement('div');  
        cartContainer.innerHTML = `
            <h3 style="color: #007600; font-size: 18px; margin-top: 0; margin-bottom: 20px;">Delivery date: Friday, September 19</h3>
                    
                <div style="display: grid; grid-template-columns: 150px 1fr 1fr; gap: 20px; align-items: start;">
                       
                    <div>
                        <img src=${imgSrc} alt="Athletic Socks" style="width: 100%; border-radius: 4px;">
                    </div>  
                    <div>
                        <h4 style="font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">${IName}</h4>
                        <p style="color: #b12704; font-size: 18px; font-weight: bold; margin: 5px 0;">${price}</p>
                        <p style="font-size: 14px; margin: 5px 0;">Quantity: 2 
                            <a href="#" style="color: #007185; text-decoration: none; margin-left: 10px;">Update</a>
                            <a href="#" style="color: #007185; text-decoration: none; margin-left: 10px;">Delete</a>
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
})} else {
        console.log('Your cart is empty.');
    }
};
    
addCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        onclickItem();
        renderCart();
    });
});




