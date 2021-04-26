import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const { login, setLogin, loader, setLoader } = useAuth();
  const navigate = useNavigate()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(user);

    try {
      setLoader(true);
      const res = await axios.post(
        "https://databaseforecomm.shubambhasin.repl.co/signin",
        user
      );

      setLoader(false);
      navigate('/')

      // just to see Login details
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login container block-center">
      <h1 className="h2 mb1-rem">Login</h1>
      <div className="login-container p1-rem">
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <div className="flex flex-col gap-01">
            {" "}
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email..."
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-01">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password..."
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex">
            <button className="btn btn-blue">
              {loader ? (
                <>
                  <div className="three col">
                    <div className="loader" id="loader-4">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </>
              ) : (
                "SignIn"
              )}
            </button>
            <small>
              New User ? <NavLink to="/signup">Create account</NavLink>
            </small>
          </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default Login;
