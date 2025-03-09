import React from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./mobile-menu";

const Dashboard = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <Sidebar />

      <div className="flex-grow md:ml-56 overflow-y-auto md:overflow-y-auto min-h-full">
        {children}
        <MobileMenu />
      </div>
    </div>
  );
};

export default Dashboard;
