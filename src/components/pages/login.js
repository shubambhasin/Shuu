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

    if(isUserLoggedIn)
    {
      navigate('/new-arrivals')
    }

  }, [])

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
        "https://databaseForEcomm-1.shubambhasin.repl.co/signin",
        user
      );
      if (res.status === 200) {
        setLoader(false);
        setLogin(true);
        const userId = res.data.user.userId;
        console.log(userId);
        localStorage.setItem(
          "user",
          JSON.stringify({ login: true, loginToken: userId })
          );
          navigate("/success");
      } else if (res.status === 401) {
        setLoader(false);
        console.log("password incorrect")
        setErrors("password incorrect");
      } else if (res.status === 404) {
        setErrors("USer is not registered");
      }
    } catch (err) {
      setLoader(false);

    setErrors("Incorrect credentials/ email not registered");

 

      console.log({"error" :err});
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
            <small className="f-red bold">{errors}</small>
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
            <small className="f-red bold">{errors}</small>
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
