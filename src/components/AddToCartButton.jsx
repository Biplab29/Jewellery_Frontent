// import React from 'react';
// import axios from 'axios';

// const AddToCartButton = ({ userId, jewelleryId, qty, price, onAdded }) => {
//   const handleAddToCart = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/cart/addItem/${userId}/${jewelleryId}`,
//         { qty, price }
//       );
//       alert(response.data.message);
//       if (onAdded) onAdded();
//     } catch (error) {
//       alert('Failed to add item to cart');
//       console.error(error);
//     }
//   };

//   return (
//     <button className="btn btn-warning" onClick={handleAddToCart}>
//       Add to Cart
//     </button>
//   );
// };

// export default AddToCartButton;
