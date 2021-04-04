import { Route, Switch } from "react-router";
import Cart from "../components/Cart";
import Brands from "../components/pages/Brands";
import Home from "../components/pages/Home";
import Men from "../components/pages/Men";
import NewArrivals from "../components/pages/NewArrivals";
import Profile from "../components/pages/Profile";
import Women from "../components/pages/Women";
import Wishlist from "../components/Wishlist";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/new-arrivals" exact component={NewArrivals}/>
      <Route path="/" exact component={Home} />
      <Route path="/brands" exact component={Brands} />
      <Route path="/men" exact component={Men} />
      <Route path="/women" exact component={Women} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/wishlist" exact component={Wishlist} />
      <Route path="/profile" exact component={Profile} />
  
      
    </Switch>
  );
};
