import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateJewellery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jname: '',
    jtype: '',
    jmaterial: '',
    jweight: '',
    jprice: '',
    jimage: null,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/jewellery/${id}`);
        const item = res.data;
  
        console.log("Fetched item:", item); // ← Check this in browser console
  
        setFormData({
          jname: item.name || '',
          jtype: item.type || '',
          jmaterial: item.material || '',
          jweight: item.weight || '',
          jprice: item.price || '',
          jimage: null,
        });
      } catch (err) {
        console.error('Error fetching item:', err);
      }
    };
  
    fetchJewellery();
  }, [id]);
  
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
      await axios.put(`https://e-jewellery-shop-.glitch.me/jewellery/update/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Jewellery updated successfully!');
      navigate('/jewelleryManager');
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Error updating item. Check console.');
    }
  };

  return (
    <div className="container py-4">
      <h2>Update Jewellery</h2>
      <form onSubmit={handleSubmit} className="row g-3">
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
          <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">Update Jewellery</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJewellery;
