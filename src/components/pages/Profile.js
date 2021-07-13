import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BottomNavbar from "../bottomNavbar/BottomNavbar";
import ButtonLoader from "../buttonLoader/ButtonLoader";
import MyLoader from "../loader/MyLoader";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "abc",
    email: "",
    pincode: "",
    district: "",
    state: "",
    address: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [serverMessage, setServerMessage] = useState("");
  const { login, authToken, loader, setLoader } = useAuth();
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Profile from line 21", profile);
    if (login) {
      (async () => {
        try {
          setLoader(true);
          const response = await axios.get(
            "https://databaseForEcomm-1.shubambhasin.repl.co/profile",
            {
              headers: {
                authorization: authToken,
              },
            }
          );
          setLoader(false);
          console.log(response);
          console.log("Profile from line 35", profile);
          console.log("Response .success line 36", response.data.success);
          if (response.data.success) {
            setProfile({
              ...profile,
              username: response.data.userInfo.name,
              email: response.data.userInfo.email,
              pincode: response.data.userAddress[0].addresses[0].pincode,
              district: response.data.userAddress[0].addresses[0].district,
              state: response.data.userAddress[0].addresses[0].state,
              address: response.data.userAddress[0].addresses[0].address,
            });
            console.log(profile);
          } else {
            // alert("something went wrong");
            console.log("I am in else block");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const editProfile = () => {
    setDisabled(false);
  };

  const saveChanges = async () => {
  try {
      setLoader(true)
      const response = await axios.post(
        "https://databaseForEcomm-1.shubambhasin.repl.co/address",
        profile,
        {
          headers: {
            authorization: authToken,
          },
        }
      );
      setLoader(false)
      setDisabled(true)
      console.log(response);
      setServerMessage(response.data.message)
      setTimeout(() => {
        setServerMessage("")
      }, 3000)
    } catch (error) {
      console.lof("Error from saveChanges", error);
    }
  };
  return (
    <div>
      <BottomNavbar/>
      {loader && (
        <div className="t-center">
          <MyLoader text="Loading..." />
        </div>
      )}
      {!loader && (
        <div className="profile container">
          <h1 className="h1">Profile</h1>
          <div>
            <span className="flex jcc ">
              <button className="btn btn-md btn-orange" onClick={editProfile}>
                Edit profile
              </button>
              {!disabled && (
                <button className="btn btn-md btn-green" onClick={saveChanges}>
                  { loader ?  <ButtonLoader text="Saving..."/>
                : "Save"}
                  </button>
              )}
            </span>
            <p className="t-center t-green">{serverMessage}</p>

            {/* <img alt="user-avatar" /> */}

            <div>
              Name:{" "}
              <input
                type="text"
                className="input-red"
                value={profile.username}
                disabled
              />
            </div>
            <div>
              Email:{" "}
              <input
                type="email"
                className="input-red"
                value={profile.email}
                disabled
              />
            </div>
            <div>
              Password: <input type="password" className="input-red" disabled />
            </div>
            <h3 className="h1">Address details</h3>
            <div>
              Pincode:{" "}
              <input
                type="number"
                name="pincode"
                className="input-red"
                value={profile.pincode}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div>
              District{" "}
              <input
                type="text"
                className="input-red"
                value={profile.district}
                disabled={disabled}
                name="district"
                onChange={handleChange}
              />
            </div>
            <div>
              State{" "}
              <input
                type="text"
                className="input-red"
                value={profile.state}
                disabled={disabled}
                name="state"
                onChange={handleChange}
              />
            </div>
            <div>
              Address{" "}
              <input
                type="text"
                className="input-red"
                value={profile.address}
                disabled={disabled}
                onChange={handleChange}
                name="address"
              />
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Profile;
