import React, { useState } from 'react';
import { storage,auth } from '../../firebase';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import 'firebase/firestore';
// import 'firebase/storage';

// // Initialize Firebase
// const firebaseConfig = {
//   // Your Firebase configuration
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const storage = firebase.storage();

const ProductList = () => {
  const [shopName, setShopName] = useState('');
  const [shopItem, setShopItem] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage

    const storageRef = ref(storage, `images/${image}`);
    await uploadBytesResumable(storageRef, image).then(() => {
        console.log("yyy");
        getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("dd",downloadURL);
            try {
                // const db = getFirestore();
                // const userRef = doc(db, "shop_List");
                // const message1 = {
                //     name: shopName,
                //     item: shopItem,
                //     imageUrl: downloadURL,
                //   };
                //   await setDoc(userRef, message1);
            } catch (error) {
                
            }
        })
    })
 

    // Reset form fields
    setShopName('');
    setShopItem('');
    setImage(null);
    setImageUrl('');
  };

  return (
    <div>
      <h1 className='md:mt-7 text-center text-4xl underline text-yellow-900 uppercase'>
        Our Products
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Shop Item"
          value={shopItem}
          onChange={(e) => setShopItem(e.target.value)}
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductList;
