import React, { useState } from "react";
import { fbdata, db } from "../../firebase";
import "./contact.css";
import { v4 as uuid } from "uuid";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { push, ref, update } from "firebase/database";
const Index = () => {
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
    e.preventDefault(); // P
    const id = uuid();
    const res = await getDoc(doc(fbdata, "contactDetails", id));
    console.log("res", res);
    if (!res.exists()) {
      await setDoc(doc(fbdata, "contactDetails", id), { User: formData });
      setFormData({
        email: "",
        mobile: "",
        name: "",
        address: "",
        description: "",
      });
      console.log("Chat document created successfully!");
    }
  };

  return (
    <div
      style={{
        marginLeft: "100px",
        marginTop: "50px",
        marginRight: "250px",
        marginBottom: "200px",
      }}
      className="centered-form-container"
    >
    <div className="contactheader">
        <h2 style={{ fontSize: "28px", textAlign: "center" ,color:'green'}}>Contact Us</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-column">
          <label style={{ color: "#707070" }} htmlFor="description">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label style={{ color: "#707070" }} htmlFor="description">
            Your mobile
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label style={{ color: "#707070" }} htmlFor="description">
            {" "}
            Your name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label style={{ color: "#707070" }} htmlFor="description">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label style={{ color: "#707070" }} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button  style={{backgroundColor:"#8a9557",padding:"10px",paddingLeft:"20px",paddingRight:"20px",color:'white'}} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Index;
