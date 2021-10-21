import { Link } from "react-router-dom";
import imgHome from "../assets/images/home.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faHammer,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./LogoutButton";
const user = () => {
  return <FontAwesomeIcon icon={faUserCircle} />;
};
const ventas = () => {
  return <FontAwesomeIcon icon={faStore} />;
};
const producto = () => {
  return <FontAwesomeIcon icon={faHammer} />;
};
const Sidebar = () => {
  return (
    <nav
      id="nav"
      className=" sidebar d-sm-none  d-md-flex flex-col h-100 mw-300 "
    >
      <div className="img-home">
        <Link to="/admin">
          <img src={imgHome} alt="img home" />
        </Link>
      </div>

      <div className="links ">
        <Ruta text="Perfil" ruta="/admin/perfil" icono={user()} />
        <Ruta
          text="administrar productos"
          ruta="/admin/productos"
          icono={producto()}
        />
        <Ruta text="administrar Ventas" ruta="/admin/ventas" icono={ventas()} />
        <Ruta text="administrar usuarios" ruta="/admin/users" icono={user()} />
      </div>

      <LogoutButton />
    </nav>
  );
};

const Ruta = ({ text, ruta, icono }) => {
  return (
    <Link to={ruta}>
      <button className="btn-sideBar">
        <i className="icon">{icono}</i> {text}
      </button>
    </Link>
  );
};

export default Sidebar;
