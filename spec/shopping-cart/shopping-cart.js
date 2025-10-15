


class ShoppingCart {
    constructor(img, name, price, quantity = 1, taxRate= 0.1) {
        this.img = img;
        this.name = name;
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

