import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Changed to useNavigate for React Router v6
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

const JewelleryManager = () => {
  const [jewelleryList, setJewelleryList] = useState([]);
  const [formData, setFormData] = useState({
    jname: '',
    jtype: '',
    jmaterial: '',
    jweight: '',
    jprice: '',
    jimage: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();  // For redirecting after logout

  const fetchJewellery = async () => {
    try {
      const res = await axios.get('https://e-jewellery-shop-.glitch.me/jewellery/all');
      setJewelleryList(res.data);
    } catch (err) {
      console.error('Error fetching jewellery:', err);
    }
  };

  useEffect(() => {
    fetchJewellery();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, jimage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (let key in formData) {
      if (key !== 'jimage' || formData.jimage) {
        payload.append(key, formData[key]);
      }
    }

    try {
      if (editingId) {
        await axios.put(`https://e-jewellery-shop-.glitch.me/jewellery/update/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Jewellery updated successfully!');
      } else {
        await axios.post('https://e-jewellery-shop-.glitch.me/jewellery/add', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Jewellery added successfully!');
      }

      setFormData({
        jname: '',
        jtype: '',
        jmaterial: '',
        jweight: '',
        jprice: '',
        jimage: null,
      });
      fileInputRef.current.value = null;
      setEditingId(null);
      fetchJewellery();
    } catch (err) {
      console.error('Error submitting jewellery:', err);
      alert('Error submitting jewellery. Check console for details.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://e-jewellery-shop-.glitch.me/jewellery/delete/${id}`);
      fetchJewellery();
    } catch (err) {
      console.error('Error deleting jewellery:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      jname: item.name,
      jtype: item.type,
      jmaterial: item.material,
      jweight: item.weight,
      jprice: item.price,
      jimage: null,
    });
    setEditingId(item.j_id);
  };

  const handleAddToCart = (j_id) => {
    const item = jewelleryList.find(j => j.j_id === j_id);
    if (item) {
      setCartItems([...cartItems, item]);
      alert("Item added to cart!");
    }
  };

  const handleLogout = () => {
    // Remove the token from cookies and redirect to login page
    Cookies.remove('authToken');
    alert("Logged out successfully!");
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">{editingId ? 'Edit Jewellery' : 'Add New Jewellery'}</h2>
        <div>
         
          <button className="btn btn-danger" onClick={handleLogout}>LogOut</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="row g-3 mb-5">
        <div className="col-md-6">
          <input type="text" name="jname" className="form-control" placeholder="Name" value={formData.jname} onChange={handleInputChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" name="jtype" className="form-control" placeholder="Type" value={formData.jtype} onChange={handleInputChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" name="jmaterial" className="form-control" placeholder="Material" value={formData.jmaterial} onChange={handleInputChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" name="jweight" className="form-control" placeholder="Weight" value={formData.jweight} onChange={handleInputChange} required />
        </div>
        <div className="col-md-6">
          <input type="number" name="jprice" className="form-control" placeholder="Price" value={formData.jprice} onChange={handleInputChange} required />
        </div>
        <div className="col-md-6">
          <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} ref={fileInputRef} required={!editingId} />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Jewellery</button>
        </div>
      </form>

      <h3>🛒 Cart: {cartItems.length} items</h3>
      <button className="btn btn-info mb-3" onClick={() => setShowCart(!showCart)}>
        {showCart ? 'Hide Cart' : 'View Cart'}
      </button>

      {showCart && (
        <div className="mb-4">
          <h4>Cart Details:</h4>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} - ₹{item.price},
                

              </li>
            ))}
          </ul>
          <h5 className="mt-3">
            Total: ₹{cartItems.reduce((total, item) => total + Number(item.price), 0)}
          </h5>
        </div>
      )}

      <h2 className="mt-4 mb-3">Jewellery Inventory</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
  {jewelleryList.map((item) => (
    <div className="col" key={item.j_id}>
      <div className="card shadow-sm" style={{ maxWidth: '300px', margin: 'auto' }}>
        <img
          src={item.image}
          className="card-img-top"
          alt={item.name}
          style={{
            height: '200px',
            objectFit: 'contain', // Maintains the image's aspect ratio while fitting it inside the box
            width: '100%',
            borderBottom: '1px solid #ddd', // Optional: adds a slight border to separate the image from the body
          }}
        />
        <div className="card-body text-center">
          <h5 className="card-title" style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.name}</h5>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>Type: {item.type}</p>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>Material: {item.material}</p>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>Weight: {item.weight}g</p>
          <p className="card-text" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Price: ₹{item.price}</p>
        </div>
        <div className="card-footer text-end">
          <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEdit(item)}>Edit</button>
          <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(item.j_id)}>Delete</button>
          <button className="btn btn-sm btn-success" onClick={() => handleAddToCart(item.j_id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default JewelleryManager;
