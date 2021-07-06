import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const { login, setLogin, loader, setLoader, isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/new-arrivals");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      setErrors({ email:"", password: ""})
      setLoader(true);
      const response = await axios.post(
        "https://databaseForEcomm-1.shubambhasin.repl.co/signin",
        user
      );
      console.log(response);
      if (response.data.error) {
        setLoader(false);
        if (response.data.error.email !== "") {
          setErrors({ ...errors, email: response.data.error.email });
        }
        if (response.data.error.password !== "") {
          setErrors({ ...errors, password: response.data.error.password });
        }
      } else {
        setLoader(false);
        setLogin(true);
        localStorage.setItem(
          "user",
          JSON.stringify({
            isUserLoggedIn: true,
            username: response.data.name,
            authToken: response.data.token,
          })
        );
        navigate("/success");
      }
    } catch (err) {
      setLoader(false);

      setErrors("Incorrect credentials/ email not registered");

      console.log({ error: err });
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
            <small className="f-red bold">{errors.email}</small>
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
            <small className="f-red bold">{errors.password}</small>
          </div>
          <div className="flex aic gap-2">
            <button className="btn btn-blue">
              {loader ? (
                <>
                  {/*########### loader #############*/}
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
