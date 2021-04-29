import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import headerImage from "../../assets/headerImage.jpg";
const Home = () => {
  const { login, setLogin } = useAuth();

  useEffect(() => {
    JSON.parse(localStorage.getItem("user")).login
      ? setLogin(true)
      : setLogin(false);
  });

  return (
    <div className="home">
      Items
      <img src={headerImage} alt="header" className="responsive" />
      <div className="home-3 container">
        <span className="home-3-item"> 
          <img
            src="https://i.pinimg.com/originals/82/9a/6d/829a6d2d0ab807fe4188ff52c1c74e6c.jpg"
            alt=""
            className="responsive"
          />
        </span>
        <span className="home-3-item">
          <img
            src="https://img1.exportersindia.com/product_images/bc-full/dir_118/3529371/mothers-care-for-babies-1919485.jpg"
            alt=""
            className="responsive"
          />
        </span>
        <span className="home-3-item">
          <img
            src="https://www.maate.in/blog/wp-content/uploads/2016/08/64I1693-scaled.jpg"
            alt=""
            className="responsive"
          />
        </span>
      </div>

      <h1 className="h1">Mother's Care</h1>
      <div className="container col-3">
        <span>
          <img
            src="https://i.pinimg.com/originals/82/9a/6d/829a6d2d0ab807fe4188ff52c1c74e6c.jpg"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://cdn.fcglcdn.com/brainbees/images/products/219x265/8688629a.webp"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://cdn.fcglcdn.com/brainbees/images/products/219x265/8071040a.webp"
            alt=""
          />
        </span>
      </div>
    </div>
  );
};

export default Home;
