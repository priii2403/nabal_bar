import React, { useState } from "react";

import { db } from "../../firebase";
import { doc, setDoc,getFirestore } from "firebase/firestore"; 
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
    e.preventDefault();

    try {
    //     const db = getFirestore();
    //     console.log(db);
    //   await setDoc(doc(db, "contacts"), formData);
      await push(ref(db, `contacts`), formData);
      
    //   db.collection('user_info').doc().set({formData}).then((formData.reset()))
    //   const docRef = await addDoc(collection(db, "contacts"), formData);
    //   console.log("Document written with ID: ", docRef.id);
      // Clear form fields after successful submission
      setFormData({
        email: "",
        mobile: "",
        name: "",
        address: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-row">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex-row">
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex-row">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex-row">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex-row">
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Index;
