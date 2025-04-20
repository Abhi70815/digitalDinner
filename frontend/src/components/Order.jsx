import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Order = () => {
    const { user } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user || !user.userId) {
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${user.userId}`);
                setItems(response.data.orders || []);
                const totalPrice = response.data.orders.reduce((acc, order) => acc + order.total, 0);
                setTotal(totalPrice);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="order-container">
            <h2>Your Orders</h2>
            {items.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {items.map(order => (
                        <li key={order._id}>
                            <p>Order ID: {order._id}</p>
                            <p>Total: ${order.total.toFixed(2)}</p>
                            <p>Items:</p>
                            <ul>
                                {order.items.map(({ itemId }) => (
                                    itemId ? (
                                        <li key={itemId._id}>{itemId.name} - ${itemId.price.toFixed(2)}</li>
                                    ) : null
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total Spent: ${total.toFixed(2)}</h3>
        </div>
    );
};

export default Order;
