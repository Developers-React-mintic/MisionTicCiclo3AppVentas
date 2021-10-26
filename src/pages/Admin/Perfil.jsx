import { useAuth0 } from "@auth0/auth0-react";
import { obtenerDatosUsuario, editarUsuario } from "utils/api";
const Perfil = () => {
  const { user } = useAuth0();

  return <div></div>;
};

export default Perfil;
