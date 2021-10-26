import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faX,
  faHammer,
  faUserCircle,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateComponent from "./PrivateComponent";

const X = () => {
  return <FontAwesomeIcon icon={faX} />;
};
const hamburger = () => {
  return <FontAwesomeIcon icon={faBars} />;
};
const userIcon = () => {
  return <FontAwesomeIcon icon={faUserCircle} />;
};
const ventas = () => {
  return <FontAwesomeIcon icon={faStore} />;
};
const producto = () => {
  return <FontAwesomeIcon icon={faHammer} />;
};

const SidebarResponsive = () => {
  const { user, logout } = useAuth0();
  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [fondoSidebar, setFondoSidebar] = useState("fondo");
  const cerrarSesion = () => {
    logout({ returnTo: "http://localhost:3000/" });
    localStorage.setItem("token", null);
  };

  useEffect(() => {
    if (mostrarSidebar) {
      setFondoSidebar("fondo ");
    } else {
      setFondoSidebar("off");
    }
  }, [mostrarSidebar]);

  return (
    <div
      className=" sidebar-container fondo position-fixed d-sm-block d-md-none align-items-start"
      onClick={() => {
        setMostrarSidebar(!mostrarSidebar);
      }}
    >
      <i className={`d-flex icon-sidebar ${fondoSidebar}`}>
        {mostrarSidebar ? X() : hamburger()}
      </i>
      {mostrarSidebar && (
        <ul className="d-flex flex-col fondo">
          <ResponsiveRoute
            icono={userIcon}
            usuario={user}
            ruta={"/admin/perfil"}
            nombre={"perfil"}
          />
          <PrivateComponent roleList={["admin"]}>
            <ResponsiveRoute
              icono={producto}
              ruta={"/admin/productos"}
              nombre={"Administrar productos"}
            />
          </PrivateComponent>
          <PrivateComponent roleList={["admin", "vendedor"]}>
            <ResponsiveRoute
              icono={ventas}
              ruta={"/admin/ventas"}
              nombre={"Administrar ventas"}
            />
          </PrivateComponent>
          <PrivateComponent roleList={["admin"]}>
            <ResponsiveRoute
              icono={userIcon}
              ruta={"/admin/usuarios"}
              nombre={"Administrar usuarios"}
            />
          </PrivateComponent>
          <button className="btn-sideBar" onClick={() => cerrarSesion()}>
            Cerrar Sesión
          </button>
        </ul>
      )}
    </div>
  );
};
const ResponsiveRoute = ({ ruta, nombre, icono, usuario }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  console.log("usuario sidebar", usuario);
  useEffect(() => {
    if (location.pathname.includes(ruta)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location, ruta]);

  return (
    <Link to={ruta}>
      <button className={`btn-sideBar ${isActive ? "isSelected" : ""}`}>
        {usuario ? (
          <>
            <img
              src={usuario.picture}
              alt="imagen usuario"
              className="icon-user"
            />
            {usuario.name}
          </>
        ) : (
          <>
            <i className="icon-user">{icono}</i> {nombre}
          </>
        )}
      </button>
    </Link>
  );
};

export default SidebarResponsive;
