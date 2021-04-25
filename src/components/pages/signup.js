import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
 
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(signup)

    try {

      const res = await axios.post("https://databaseforecomm.shubambhasin.repl.co/signup", signup)
      console.log(res)

    }
    catch(err){
      console.log(err)
    }

  }
  return (
    <div className="signup block-center container">
      <h1 className="h2 mb1-rem">SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="signup-container flex flex-col p1-rem">
          <div className="flex flex-col gap-01">
            <label>Name</label>
            <input
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
              type="email"
              name="email"
              required
              placeholder="First Name..."
              value={signup.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-01">
            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-01">
            <label>Password</label>
            <input
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
          <button className="btn btn-red"> SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
