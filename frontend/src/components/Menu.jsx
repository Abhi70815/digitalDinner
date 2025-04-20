import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/menu');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    const addToOrder = (item) => {
        setOrderItems(prevItems => [...prevItems, item]);
        setTotal(prevTotal => prevTotal + item.price);
    };

    const submitOrder = async () => {
        if (!user || !user.userId) {
            alert('Please login to place an order.');
            return;
        }
        if (orderItems.length === 0) {
            alert('No items in order.');
            return;
        }
        try {
            const items = orderItems.map(item => ({ itemId: item._id, quantity: 1 }));
            await axios.post('http://localhost:5000/api/orders', { userId: user.userId, items, total });
            alert('Order placed successfully!');
            setOrderItems([]);
            setTotal(0);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order.');
        }
    };

    return (
        <div className="menu-container">
            <h2>Menu</h2>
            <div className="menu-items">
                {menuItems.map(item => (
                    <div key={item._id} className="menu-item">
                        <img src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <button onClick={() => addToOrder(item)}>Add to Order</button>
                    </div>
                ))}
            </div>
            <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Items: {orderItems.length}</p>
                <p>Total: ${total.toFixed(2)}</p>
                <button onClick={submitOrder} disabled={orderItems.length === 0}>Place Order</button>
            </div>
        </div>
    );
};

export default Menu;
