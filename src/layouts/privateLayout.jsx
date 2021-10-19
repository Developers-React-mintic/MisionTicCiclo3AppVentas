import Sidebar from "components/Sidebar.jsx";
import PrivateRoute from "./PrivateRoute";

const privateLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div className="d-flex w-screen h-screen">
        <Sidebar />
        <main className="d-flex w-100 overflow-y-scroll">{children}</main>
      </div>
    </PrivateRoute>
  );
};

export default privateLayout;
