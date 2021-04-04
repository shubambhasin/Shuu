import React from "react";
import { useProducts } from "../../context/ProductContext";
const Home = () => {
  
    const { state, dispatch } = useProducts()
 
    return (
    <div className="home container">
      <h1 className="h1">Home</h1>
            
     </div>
  );
};

export default Home;
