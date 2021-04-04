import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { LOAD_PRODUCTS } from "../reducer/actions";

const Home = () => {
  
    const { state, dispatch } = useProducts()
 
    return (
    <div className="home">
      <h1 className="h1">Home</h1>
            
     </div>
  );
};

export default Home;
