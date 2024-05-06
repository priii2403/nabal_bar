import React, { useState, useEffect } from "react";
import AddProduct from "../../components/AddProduct/Index";
import Modal from "../../components/Modal/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { fbdata } from "../../firebase"; // Assuming you have initialized your Firestore instance as `fbdata`
import "./css";
import { Table, Space, Tag,Button,Drawer } from "antd";
import { EditOutlined, DeleteFilled, MenuOutlined, CloseOutlined  } from "@ant-design/icons";
import ProductList from "./ProductList";
import ContactList from "./ContactList";
import AddContact from "../../components/AddContact/Index";
import { set } from "firebase/database";
const Index = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [contactList, setcontactList] = useState([])
  const [EditMode, setEditMode] = useState(false);
  const [ContactEditMode, setContactEditMode] = useState(false);
  const [UpdateData, setUpdateData] = useState();
    useEffect(() => {
    fetchDataFromFirestore();
    
  }, []);
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };
  const column = [
    {
      title: "Name",
      dataIndex: ["User", "name"],
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: ["User", "mobile"],
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: ["User", "email"],
      key: "email",
    },
    {
      title: "Address",
      dataIndex: ["User", "address"],
      key: "address",
    },
    {
      title: "Description",
      dataIndex: ["User", "description"],
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleUpdateContact(record)} />

          <DeleteFilled
            onClick={() => handleDeleteProduct(record.id)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </Space>
      ),
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: ["Products", "Name"],
      key: "name",
    },
    {
      title: "Ingredients",
      dataIndex: ["Products", "Ingredients"],
      key: "ingredients",
    },
    {
      title: "Benefits",
      dataIndex: ["Products", "Benefits"],
      key: "benefits",
    },
    {
      title: 'URL',
      dataIndex: ['Products', 'URL'],
      key: 'url',
      render: (url) => (
        <div>
          <img src={url} alt="Product" style={{ width: '100px' }} />
         
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: ["Products", "Price"],
      key: "Price",
      
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleUpdateProduct(record)} />

          <DeleteFilled
            onClick={() => handleDeleteProduct(record.id)}
            style={{ color: "red", marginLeft: 12 }}
            />
        </Space>
      ),
    },
  ];
  

  {console.log("uppp",UpdateData);}

  const fetchDataFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(fbdata, "ProductDetails"));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setProductList(products);


      const querySnapshot1 = await getDocs(collection(fbdata, "contactDetails"));
      const contacts = [];
      querySnapshot1.forEach((doc) => {
        contacts.push({ id: doc.id, ...doc.data() });
      });
      setcontactList(contacts);


    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };
  console.log(JSON.stringify(contactList,null,2));
  const handleUpdateProduct = (data) => {
    console.log(data);
    setEditMode(true);
    setUpdateData(data);
    setIsModalOpen(true);
  };
  const handleUpdateContact = (data) => {
    setContactEditMode(true);
    setUpdateData(data);
    setIsContactModalOpen(true)
  };
  console.log(UpdateData);
  const handleDeleteProduct = async (id) => {
    // Delete product from Firestore
    try {
      await deleteDoc(doc(fbdata, "ProductDetails", id));
      // Remove the deleted product from the local product list
      setProductList(productList.filter((product) => product.id !== id));
      console.log("Product deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const [selectedMenu, setSelectedMenu] = useState("products");


  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    onCloseDrawer(); // Close the drawer after clicking a menu item
  };
  const handleAddProduct = () => {
    console.log("heree");
    setUpdateData('')
    setEditMode(false)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddContact = () => {
    console.log("heree");
    setUpdateData('')
    setContactEditMode(false)
    setIsContactModalOpen(true)

 
  };

  const handleContactCloseModal = () => {
    setIsContactModalOpen(false)
  };

  return (
    <div>
     <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px',paddingRight:"20px" }}>
     {
      selectedMenu === "products" ? 
      <button onClick={handleAddProduct}>Add Product</button>:
      <button onClick={handleAddContact}>Add Contact</button>
     }
      <MenuOutlined  onClick={showDrawer} style={{ marginLeft: 16 }}/>
    
      </div>
      <Drawer
        title="Lists"
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={drawerVisible}
        
        >
 <div>
  <h2
    style={{  padding: "30px", backgroundColor: "white", borderRadius: "5px",fontWeight:"400" ,fontSize:"1.4rem"}}
    onClick={() => handleMenuClick("products")}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#8A9556")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
  >
    Product List
  </h2>
  <h2
    style={{ padding: "30px", backgroundColor: "white", borderRadius: "5px",fontWeight:"400" ,fontSize:"1.4rem"}}
    onClick={() => handleMenuClick("contacts")}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#8A9556")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
  >
    Contact List
  </h2>
</div>
        
      </Drawer>
   
 
      {selectedMenu === "products" && <ProductList columns={columns} productList={productList} />}

      {selectedMenu === "contacts" && <ContactList columns={column} productList={contactList}/>}
      {EditMode ? (
               console.log('products 1'),
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <AddProduct
            onClose={handleCloseModal}
            initialProduct={UpdateData}
          />
        </Modal>
      ) : (
    
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <AddProduct onClose={handleCloseModal} />
        </Modal>
      )}
      {ContactEditMode ? (
        console.log('1'),
        <Modal isOpen={isContactModalOpen} onClose={handleContactCloseModal}>
          <AddContact
            onClose={handleContactCloseModal}
            initialContact={UpdateData}
          />
        </Modal>
      ) : (
        console.log('2'),
        <Modal isOpen={isContactModalOpen} onClose={handleContactCloseModal}>
          <AddContact onClose={handleContactCloseModal} />
        </Modal>
      )}

  
    </div>
  );
};

export default Index;
