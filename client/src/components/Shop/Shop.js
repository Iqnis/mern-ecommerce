import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shop = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shopp/clothes');
        setClothes(response.data.data); // Use the response data
      } catch (error) {
        console.error('Error fetching clothes:', error);
      }
    };

    fetchClothes();
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      <ul>
        {clothes.map(cloth => (
          <li key={cloth._id}>
            <img src={cloth.image} alt={cloth.item} />
            <h2>{cloth.item}</h2>
            <p>{cloth.description}</p>
            <p>${cloth.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
