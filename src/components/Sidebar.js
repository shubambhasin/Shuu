import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col">
      <h1 className="h3">Filters</h1>
      <div className="flex align-center gap-1">
        <input type="radio"/>
        <label>High to Low</label>
      </div>
      <div className="flex align-center gap-1">
        <input type="radio"/>
        <label>Low to High</label>
      </div>
      <div className="flex align-center gap-1">
        <input type="radio"/>
        <label>In stock only</label>
      </div>
      <div className="flex align-center gap-1">
        <input type="radio"/>
        <label>Express Delivery only</label>
      </div>
    </div>
  );
};

export default Sidebar;
