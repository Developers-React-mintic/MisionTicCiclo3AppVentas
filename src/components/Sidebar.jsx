import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import imgHome from "../assets/images/home.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faHammer,
  faUserCircle,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateComponent from "./PrivateComponent";

const userIcon = () => {
  return <FontAwesomeIcon icon={faUserCircle} />;
};
const ventas = () => {
  return <FontAwesomeIcon icon={faStore} />;
};
const producto = () => {
  return <FontAwesomeIcon icon={faHammer} />;
};
const hamburger = () => {
  return <FontAwesomeIcon icon={faAngleLeft} />;
};
const X = () => {
  return <FontAwesomeIcon icon={faAngleRight} />;
};

const Sidebar = () => {
  const { user, logout } = useAuth0();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [cambioDeClase, setcambioDeClase] = useState("block");
  const [claseBtnToggle, setclaseBtnToggle] = useState("");

  useEffect(() => {
    if (toggleSidebar) {
      setcambioDeClase("none");
    } else {
      setcambioDeClase("block");
      setclaseBtnToggle("fondo");
    }
  }, [toggleSidebar]);

  const cerrarSesion = () => {
    logout({ returnTo: "https://developerscorpecommerce.herokuapp.com/" });
    localStorage.setItem("token", null);
  };

  return (
    <div className="position-relative">
      <div
        className=" position-absolute btn-mostrar fondo"
        onClick={() => {
          setToggleSidebar(!toggleSidebar);
        }}
      >
        <i>{toggleSidebar ? X() : hamburger()}</i>
      </div>

      <nav
        id="nav"
        className={`sidebar position-relative d-sm-none  d-md-${cambioDeClase} flex-col h-100  mw-300`}
      >
        <div
          className={`position-absolute btn-ocultar ${claseBtnToggle}`}
          onClick={() => {
            setToggleSidebar(!toggleSidebar);
          }}
        >
          <i>{toggleSidebar ? X() : hamburger()}</i>
        </div>
        <div className="img-home">
          <Link to="/admin">
            <img src={imgHome} alt="img home" />
          </Link>
        </div>

        <div className="links ">
          <Ruta
            nombre="Perfil"
            ruta="/admin/perfil"
            icono={userIcon}
            usuario={user}
          />
          <PrivateComponent roleList={["admin"]}>
            <Ruta
              nombre="administrar productos"
              ruta="/admin/productos"
              icono={producto()}
            />
          </PrivateComponent>
          <PrivateComponent roleList={["admin", "vendedor"]}>
            <Ruta
              nombre="administrar Ventas"
              ruta="/admin/ventas"
              icono={ventas()}
            />
          </PrivateComponent>
          <PrivateComponent roleList={["admin"]}>
            <Ruta
              nombre="administrar usuarios"
              ruta="/admin/users"
              icono={userIcon()}
            />
          </PrivateComponent>
        </div>

        <button className="btn-sideBar" onClick={() => cerrarSesion()}>
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

const Ruta = ({ nombre, ruta, icono, usuario }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
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

export default Sidebar;
