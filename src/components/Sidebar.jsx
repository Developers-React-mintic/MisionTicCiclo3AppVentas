import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imgHome from "../assets/images/home.svg";
import LogoutButton from "./LogoutButton";
const Sidebar = () => {
  // TODO ver como ocultar el sidebar con use estate o renderizacion condicional
  const [ocultar, setOcultar] = useState(false);
  return (
    <nav className="d-flex h-100 mw-300 border-right">
      <ul>
        <li>
          <Link to="/admin">
            <img src={imgHome} alt="img home" />
          </Link>
        </li>
        <li>
          <Link to="/admin/ventas">Ventas</Link>
        </li>
        <li>
          <Link to="/admin/pedidos">Pedidos</Link>
        </li>
        <li>
          <Link to="/admin/users">administrar usuarios</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
