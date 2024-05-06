import React, { useState, useEffect } from "react";
import { fbdata } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

const AddContact = ({ onClose, initialContact }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
const [Id, setId] = useState();
console.log(Id,initialContact);
  // Populate fields with initial contact data if provided
  useEffect(() => {
    if (initialContact) {
      setName(initialContact.User.name || "");
      setAddress(initialContact.User.address || "");
      setMobile(initialContact.User.mobile || "");
      setEmail(initialContact.User.email || "");
      setDescription(initialContact.User.description || "");
      setId(initialContact.id || "")
    }
  }, [initialContact]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Prepare contact data
      const data = {
        name,
        address,
        mobile,
        email,
        description,
      };
      console.log(data);
      // Check if it's an edit or add operation
      if (initialContact) {
        // Update existing contact
        await updateDoc(doc(fbdata, "contactDetails", initialContact.id), {
          User: data,
        });
        console.log("Contact updated successfully!");
      } else {
        // Add new contact
        const c_id = uuid();
        const res = await getDoc(doc(fbdata, "contactDetails", c_id));
        if (!res.exists()) {
          await setDoc(doc(fbdata, "contactDetails", c_id), { User: data });
          console.log("Contact added successfully!");
        }
      }

      // Reset form fields after submission
      setName("");
      setAddress("");
      setMobile("");
      setEmail("");
      setDescription("");
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error submitting contact:", error);
    }
  };

  return (
    <div>
      <h2>{initialContact ? "Edit Contact" : "Add a New Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label htmlFor="address">Address:</label>
        <br />
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />

        <label htmlFor="mobile">Mobile:</label>
        <br />
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button type="submit">{initialContact ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default AddContact;
