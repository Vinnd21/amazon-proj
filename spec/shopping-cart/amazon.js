

const numCart = document.querySelector('numItems')


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
                <a class="numItens" href="/check.html" style="cursor: pointer; display: flex; align-items: center; position: relative; text-decoration: none; color: inherit;">
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


