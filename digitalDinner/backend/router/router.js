const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const { MenuItem, Order} = require('../models/ItemAndOrder'); // Adjust the path as necessary
const router = express.Router();

// Signup Endpoint
router.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newUser  = new User({ name, email, password });
        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login Endpoint
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });
        res.status(200).json({ userId: user._id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a Menu Item
router.post('/api/menu', async (req, res) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;

        // Create a new menu item
        const newItem = new MenuItem({
            name,
            description,
            price,
            category,
            imageUrl
        });

        // Save the item to the database
        await newItem.save();

        // Send a success response
        res.status(201).json({ message: 'Menu item created successfully', item: newItem });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating menu item', error: error.message });
    }
});

// Fetch all Menu Items
router.get('/api/menu', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching menu items.' });
    }
});

// Fetch a Single Menu Item
router.get('/api/menu/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching the menu item.' });
    }
});

// Create a New Order
router.post('/api/orders', async (req, res) => {
    const { userId, items, total } = req.body;

    // Basic validation
    if (!userId || !items || !total) {
        return res.status(400).json({ message: 'User ID, items, and total are required.' });
    }

    try {
        const order = new Order({ userId, items, total });
        await order.save(); // Ensure to await the save operation
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating the order.', error: error.message });
    }
});

// Fetch Orders by User Identifier
router.get('/api/orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .populate({
                path: 'items.itemId', // Specify the path to populate
                model: 'MenuItem' // The model to populate from
            });
        res.json({ message: 'Orders fetched successfully', orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching orders.', error: error.message });
    }
});
// Export the router
module.exports = router;