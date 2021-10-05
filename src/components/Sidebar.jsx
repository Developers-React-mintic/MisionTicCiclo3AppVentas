import { Link } from "react-router-dom";
import imgHome from "../assets/images/home.svg";
const Sidebar = () => {
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
          <Link to="">Log out</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
