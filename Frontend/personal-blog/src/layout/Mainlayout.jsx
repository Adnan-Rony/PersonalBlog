import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navber from "../components/Shared/Navber.jsx";
import Navvber from "../components/Shared/Navvber.jsx";


const Mainlayout = () => {
  return (
    <div className=" ">
      <Navber></Navber>
      {/* <Navvber></Navvber> */}
     

      <main className="   bg-black ">
        <Outlet />
          <ScrollRestoration />
      </main>

   
    </div>
  );
};

export default Mainlayout;
