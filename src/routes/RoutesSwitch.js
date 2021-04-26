import { Routes, Route,} from "react-router";
import Cart from "../components/Cart";
import Blog from "../components/pages/Blog";
import Brands from "../components/pages/Brands";
import Contact from "../components/pages/contact";
import Home from "../components/pages/Home";
import Login from "../components/pages/login";
import Men from "../components/pages/Men";
import NewArrivals from "../components/pages/NewArrivals";
import Profile from "../components/pages/Profile";
import Signup from "../components/pages/signup";
import SignupSuccess from "../components/pages/SignupSuccess";
import Women from "../components/pages/Women";
import Wishlist from "../components/Wishlist";

export const RoutesSwitch = () => {
  return (
    <Routes>
      <Route path="/new-arrivals"  element={<NewArrivals/>}/>
      <Route path="/"  element={<Home/>} />
      <Route path="/brands"  element={<Brands/>}/> />
      <Route path="/men"  element={<Men/>} />
      <Route path="/women"  element={<Women/>} />
      <Route path="/cart"  element={<Cart/>} />
      <Route path="/wishlist"  element={<Wishlist/>} />
      <Route path="/profile"  element={<Profile/>} />
      <Route path="/contact-us"  element={<Contact/>} />
      <Route path="/blog"  element={<Blog/>} />
      <Route path="/signup"  element={<Signup/>} />
      <Route path="/signup-success"  element={<SignupSuccess/>} />
      <Route path="/login"  element={<Login/>} />      
    </Routes>
  );
};
