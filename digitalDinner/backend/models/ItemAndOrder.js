// models/ItemAndOrder.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'] },
    imageUrl: { type: String }
});

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { MenuItem, Order };
