import React, { useState, useEffect } from "react";
import { fbdata, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AddProduct = ({ onClose, initialProduct }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [benefit, setBenefit] = useState("");
console.log(initialProduct);
  // Populate fields with initial product data if provided
  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.Name || "");
      setImageUrl(initialProduct.URL || "");
      setIngredients(initialProduct.Ingredients || "");
      setBenefit(initialProduct.Benefits || "");
    }
  }, [initialProduct]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `SoapImage/${uuid()}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setImageUrl(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Prepare product data
      const data = {
        Name: name,
        URL: imageUrl,
        Ingredients: ingredients,
        Benefits: benefit,
      };

      // Check if it's an edit or add operation
      if (initialProduct) {
        // Update existing product
        await updateDoc(doc(fbdata, "ProductDetails", initialProduct.id), {
          Products: data,
        });
        console.log("Product updated successfully!");
      } else {
        // Add new product
        const p_id = uuid();
        const res = await getDoc(doc(fbdata, "ProductDetails", p_id));
        if (!res.exists()) {
          await setDoc(doc(fbdata, "ProductDetails", p_id), { Products: data });
          console.log("Product added successfully!");
        }
      }

      // Reset form fields after submission
      setName("");
      setImageUrl("");
      setIngredients("");
      setBenefit("");
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div>
      <h2>{initialProduct ? "Edit Product" : "Add a New Product"}</h2>
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

        <label htmlFor="image">Image:</label>
        <br />
        <input type="file" id="image" onChange={handleImageChange} />
        <br />

        <label htmlFor="imageUrl">Image URL:</label>
        <br />
        <input type="text" id="imageUrl" value={imageUrl} disabled />
        <br />

        <label htmlFor="ingredients">Ingredients:</label>
        <br />
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <br />

        <label htmlFor="benefit">Benefits:</label>
        <br />
        <textarea
          id="benefit"
          value={benefit}
          onChange={(e) => setBenefit(e.target.value)}
        />
        <br />

        <button type="submit">{initialProduct ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default AddProduct;