import React, { useState, useEffect } from "react";
import AddProduct from "../../components/AddProduct/Index";
import Modal from "../../components/Modal/Modal";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { fbdata } from "../../firebase"; // Assuming you have initialized your Firestore instance as `fbdata`
import './css';
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
const [EditMode, setEditMode] = useState(false)
const [UpdateData, setUpdateData] = useState()
  useEffect(() => {
    fetchDataFromFirestore();
  }, []); // Fetch data on component mount

  const fetchDataFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(fbdata, "ProductDetails"));
      const products = [];
      querySnapshot.forEach((doc) => {
        // Assuming each document contains product details
        products.push({ id: doc.id, ...doc.data() });
      });
      setProductList(products);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };
const handleUpdateProduct=(data)=>{
    setEditMode(true)
        setUpdateData(data)
        handleAddProduct()
   
}
console.log(UpdateData);
const handleDeleteProduct = async (id) => {
    // Delete product from Firestore
    try {
      await deleteDoc(doc(fbdata, "ProductDetails", id));
      // Remove the deleted product from the local product list
      setProductList(productList.filter(product => product.id !== id));
      console.log("Product deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Screen with Add Product Button</h1>
      <button onClick={handleAddProduct}>Add Product</button>
{
    EditMode  ?   <Modal isOpen={isModalOpen}  onClose={handleCloseModal}>
    <AddProduct onClose={handleCloseModal} initialProduct={UpdateData.Products} />
  </Modal> :   <Modal isOpen={isModalOpen} onClose={handleCloseModal} > 
        <AddProduct onClose={handleCloseModal}  />
      </Modal>
}
     

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>URL</th>
              <th>Ingredients</th>
              <th>Benefits</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.Products.id}>
                <td>{product.Products.id}</td>
                <td>{product.Products.Name}</td>
                <td>{product.Products.URL}</td>
                <td>{product.Products.Ingredients}</td>
                <td>{product.Products.Benefits}</td>
                <td style={{ display: "flex", flexDirection: "row" }}>
  {/* Update and delete options */}
  <FaEdit onClick={() => handleUpdateProduct(product)} />
  <FaTrash onClick={() => handleDeleteProduct(product.id)} />
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
