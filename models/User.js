const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phone: Number,
    avatar: String,
    role: String,

    cart: {
        items: [
            {
                saleId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Sale'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})


UserSchema.method.addToCart = function (sale) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.saleId.toString() === sale._id.toString();
    })

    let newQuantity = 1;

    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            saleId: sale._id,
            quantity: newQuantity
        });
    }

    const updatedCart = {
        items: updatedCartItems
    };

    this.cart = updatedCart;
    return this.save();
}

UserSchema.methods.removeFromCart = function(sale) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.sale.toString() !== sale.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

UserSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
};


module.exports = model('User', UserSchema);