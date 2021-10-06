import Sidebar from "components/Sidebar.jsx";
const privateLayout = ({ children }) => {
  return (
    <div className="d-flex w-screen h-screen">
      <Sidebar />
      <main className="d-flex w-100 overflow-y-scroll">{children}</main>
    </div>
  );
};

export default privateLayout;
