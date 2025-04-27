import React from "react";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div>
      <main className="w-full max-w-screen-xl mx-auto">
       
        <Outlet />
      </main>
    </div>
  );
};

export default Mainlayout;
