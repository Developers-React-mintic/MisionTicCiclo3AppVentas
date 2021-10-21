import Sidebar from "components/Sidebar.jsx";
import SidebarResponsive from "components/SidebarResponsive";
import PrivateRoute from "./PrivateRoute";

const privateLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div className="d-md-flex d-sm-flex-col w-screen h-screen">
        <Sidebar />
        <SidebarResponsive />
        <main className=" main d-flex w-100 overflow-y-scroll">{children}</main>
      </div>
    </PrivateRoute>
  );
};

export default privateLayout;
