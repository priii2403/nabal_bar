import React, { useState, useEffect } from "react";
import { fbdata } from "../../firebase";
import "./contact.css";
import { v4 as uuid } from "uuid";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    name: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uuid();
    const res = await getDoc(doc(fbdata, "contactDetails", id));
    if (!res.exists()) {
      await setDoc(doc(fbdata, "contactDetails", id), { User: formData });
      setFormData({
        email: "",
        mobile: "",
        name: "",
        address: "",
        description: "",
      });
    }
  };

  return (
    <div className="centered-form-container">
      <div className="contact-header" style={{ fontFamily: 'Urbanist' }}>
        <h2>Contact Us</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Your mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button style={{ backgroundColor: "#8A9556" }} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Index;
