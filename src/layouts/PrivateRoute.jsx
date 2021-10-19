import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from "react-loading";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <ReactLoading type="balls" color="#000000" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return loginWithRedirect();
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;
