import React, { useEffect, useState } from "react";
import Sidebar from "components/Sidebar.jsx";
import SidebarResponsive from "components/SidebarResponsive";
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from "react-loading";
import { obtenerDatosUsuario } from "utils/api";
import { useUser } from "context/userContext";


const PrivateLayout = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0();
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const { setUserData } = useUser();

  useEffect(() => {
    const fetchAuth0Token = async () => {
      setLoadingUserInformation(true);
      const accessToken = await getAccessTokenSilently({
        audience: `api-autenticacion-ferreteria-mintic`,
      });
      // 2. recibir token de auth0
      localStorage.setItem("token", accessToken);
      console.log(accessToken);
      // 3. enviarle el token a el backend
      await obtenerDatosUsuario(
        (response) => {
          console.log(
            "response con datos del usuario en el private layout:",
            response
          );
          setUserData(response.data);
          setLoadingUserInformation(false);
        },
        (err) => {
          console.log("err", err);
          setLoadingUserInformation(false);
          logout({ returnTo: "https://developerscorpecommerce.herokuapp.com/admin" });
        }
      );
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);

  if (isLoading || loadingUserInformation)
    return (
      <div className="d-flex-row center h-100 w-full">
        <span>
          cargando
          <ReactLoading type="balls" color="#abc123" height={667} width={51} />
        </span>
      </div>
    );

  if (!isAuthenticated) {
    return loginWithRedirect();
  }

  return (
    <div className="d-md-flex d-sm-flex-col w-screen h-screen">
      <Sidebar />
      <SidebarResponsive />
      <main className=" main d-flex w-100 overflow-y-scroll">{children}</main>
    </div>
  );
};

export default PrivateLayout;
