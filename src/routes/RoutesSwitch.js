import { Routes, Route } from "react-router";
import Cart from "../components/Cart";
import Blog from "../components/pages/Blog";
import Brands from "../components/pages/Brands";
import Contact from "../components/pages/contact";
import Home from "../components/pages/Home";
import Login from "../components/pages/login";
import Men from "../components/pages/Men";
import NewArrivals from "../components/pages/NewArrivals";
import ProductDetailPage from "../components/pages/ProductDetailPage";
import Profile from "../components/pages/Profile";
import Signup from "../components/pages/signup";
import Success from "../components/pages/Success";
import Women from "../components/pages/Women";
import Wishlist from "../components/Wishlist";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const RoutesSwitch = () => {
  return (
    <Routes>
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      {/* <Route path="/cart"  element={<Cart/>} /> */}
      {/* <Route path="/wishlist"  element={<Wishlist/>} /> */}
      <ProtectedRoutes path="/wishlist" element={<Wishlist />} />
      <ProtectedRoutes path="/cart" element={<Cart />} />
      <ProtectedRoutes path="/profile" element={<Profile />} />
      {/* <Route path="/profile"  element={<Profile/>} /> */}
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/success" element={<Success />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:id">
        <ProductDetailPage />
      </Route>
    </Routes>
  );
};
