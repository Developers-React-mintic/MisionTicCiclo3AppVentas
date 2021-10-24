import React from "react";

import SidebarResponsive from "components/SidebarResponsive";
import Sidebar from "components/Sidebar";

const PublicLayout = ({ children }) => {
  return (
    <div className="d-md-flex d-sm-flex-col w-screen h-screen">
      <Sidebar />
      <SidebarResponsive />
      <main className=" main d-flex w-100 overflow-y-scroll">{children}</main>
    </div>
  );
};

export default PublicLayout;
