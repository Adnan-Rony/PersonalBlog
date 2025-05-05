import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../components/Shared/Navber.jsx";

const Mainlayout = () => {
  return (
    <div>
      <Navber></Navber>

      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Mainlayout;
