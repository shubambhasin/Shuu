import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Home = () => {

  const { login, setLogin } = useAuth()

  useEffect(() => {
    JSON.parse(localStorage.getItem("user")).login ? setLogin(true) : setLogin(false) 
  })

  return (
    <div className="home container">
      <h1 className="h1">Home</h1>
      <p> {login ? "Home" : "Not home"}</p>
    </div>
  );
};

export default Home;
