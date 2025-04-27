import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewCart = ({ userId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/cart/viewcart/${userId}`);
        setCart(res.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userId]);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="container mt-4">
      <h3>Cart for {cart.user.name}</h3>
      <ul className="list-group mb-3">
        {cart.items.map((item, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between">
            <span>
              {item.name} ({item.material}) - Qty: {item.qty}
            </span>
            <span>₹{item.totalPrice}</span>
          </li>
        ))}
      </ul>
      <h5>Total: ₹{cart.net_Amount}</h5>
    </div>
  );
};

export default ViewCart;
