import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
require("dotenv").config();
const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    // phoneNumber: "",
  });
  const { setLogin, loader, setLoader } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signup);
    try {
      setLoader(true);
      const res = await axios.post(
        "https://databaseForEcomm-1.shubambhasin.repl.co/signup",
        signup
      );
      setLoader(false);
      setLogin(true);
      navigate("/success");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup block-center container">
      <h1 className="h2 mb1-rem">SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="signup-container flex flex-col p1-rem">
          <div className="flex flex-col gap-01">
            <label>Name</label>
            <input
              className="input input-red"
              type="text"
              name="name"
              required
              placeholder="First Name..."
              value={signup.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-01">
            <label>Email</label>
            <input
            className="input input-red"
              type="email"
              name="email"
              required
              placeholder="First Name..."
              value={signup.email}
              onChange={handleChange}
            />
          </div>
          {/* <div className="flex flex-col gap-01">
            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />
          </div> */}
          <div className="flex flex-col gap-01">
            <label>Password</label>
            <input
            className="input input-red"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>
          {/* <div className="flex flex-col gap-01">
            <label>Re-type Password</label>
            <input
              type="password"
              name="retypepassword"
              placeholder="re-type password"
              required
              onChange={handleChange}
            />
          </div> */}
          <div className="flex aic gap-2">
            <button className="btn btn-orange">
              {" "}
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
                "SignUp"
              )}
            </button>
            <small>
              {" "}
              Already a user ?
              <NavLink className="m1-rem" to="/login">
                Login here
              </NavLink>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
