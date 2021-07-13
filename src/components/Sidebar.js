import React from "react";
import { useProducts } from "../context/ProductContext";
import {
  FAST_DELIVERY,
  HIGH_TO_LOW,
  INSTOCK_TOGGLE,
  LOW_TO_HIGH,
} from "../reducer/actions";

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useProducts();
  const { dispatch } = useProducts();
  return (
    <div className={`${showSidebar ? "" : "sidebar-hide"}`}>
      <div className="sidebar flex flex-col">
        <span className="flex  aic jcsb">
          {" "}
          <h1 className="h3 mtb1-rem">Sort By</h1>
          <span onClick={() => setShowSidebar(!showSidebar)}>X</span>
        </span>
        <div className="flex align-center gap-1">
          <input
            type="radio"
            name="filter-one"
            onChange={() => dispatch({ type: HIGH_TO_LOW })}
          />
          <label>High to Low</label>
        </div>
        <div className="flex align-center gap-1">
          <input
            type="radio"
            name="filter-one"
            onChange={() => dispatch({ type: LOW_TO_HIGH })}
          />
          <label>Low to High</label>
        </div>

        <h1 className="h3 mtb1-rem">Filters</h1>
        <div className="flex align-center gap-1">
          <input
            type="checkbox"
            onChange={() => dispatch({ type: INSTOCK_TOGGLE })}
          />
          <label>In stock only</label>
        </div>

        {/* 
      <div className="flex align-center gap-1">
        <input type="checkbox" onChange={() => dispatch({type: FAST_DELIVERY })}/>
        <label>Express Delivery only</label>
      </div>
    */}
      </div>
    </div>
  );
};

export default Sidebar;
