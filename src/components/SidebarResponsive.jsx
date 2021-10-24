import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
const X = () => {
  return <FontAwesomeIcon icon={faX} />;
};
const hamburger = () => {
  return <FontAwesomeIcon icon={faBars} />;
};
const SidebarResponsive = () => {
  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [fondoSidebar, setFondoSidebar] = useState("fondo");

  useEffect(() => {
    if (mostrarSidebar) {
      setFondoSidebar("fondo font-20");
    } else {
      setFondoSidebar("off");
    }
  }, [mostrarSidebar]);

  return (
    <div
      className=" sidebar-container d-sm-block d-md-none align-items-start"
      onClick={() => {
        setMostrarSidebar(!mostrarSidebar);
      }}
    >
      <i className={`d-flex icon-sidebar ${fondoSidebar}`}>
        {mostrarSidebar ? X() : hamburger()}
      </i>
      {mostrarSidebar && (
        <ul className="fondo">
          <ResponsiveRoute route={"/admin/perfil"} text={"perfil"} />
          <ResponsiveRoute
            route={"/admin/productos"}
            text={"Administrar productos"}
          />
          <ResponsiveRoute
            route={"/admin/ventas"}
            text={"Administrar ventas"}
          />
          <ResponsiveRoute
            route={"/admin/usuarios"}
            text={"Administrar usuarios"}
          />
        </ul>
      )}
    </div>
  );
};
const ResponsiveRoute = ({ route, text }) => {
  return (
    <Link to={route}>
      <li>{text}</li>
    </Link>
  );
};

export default SidebarResponsive;
