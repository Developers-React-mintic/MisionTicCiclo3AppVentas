import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";

import PrivateComponent from "../../components/PrivateComponent";
import { editarUsuario } from "utils/api";
import { obtenerUsuarios } from "utils/api";
const Users = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log("usuarios", respuesta.data);
          setUsuarios(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsuarios();
  }, []);

  return (
    <div>
      <div>admin usuarios</div>
      <PrivateComponent roleList={["admin"]}>
        <button className="bg-red-400">Hola RBAC</button>
      </PrivateComponent>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
            return (
              <tr key={nanoid()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <EstadoUsuario user={user} />
                </td>
                <td>
                  <RolesUsuario user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const RolesUsuario = ({ user }) => {
  const [rol, setRol] = useState(user.rol);

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { rol },
        (res) => {
          toast.success("Usuario modificado con éxito");
          console.log(res);
        },
        (err) => {
          toast.error("Error actualizando el usuario");
          console.error(err);
        }
      );
    };
    if (user.rol !== rol) {
      editUsuario();
    }
  }, [rol, user]);

  return (
    <select value={rol} onChange={(e) => setRol(e.target.value)}>
      <option value="" disabled>
        Seleccione un rol
      </option>
      <option value="admin">Admin</option>
      <option value="vendedor">Vendedor</option>
      <option value="sin rol">Sin rol</option>
    </select>
  );
};

const EstadoUsuario = ({ user }) => {
  const [estado, setEstado] = useState(user.estado ?? "");

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { estado },
        (res) => {
          toast.success("Usuario modificado con éxito");

          console.log(res);
        },
        (err) => {
          toast.error("Error actualizando el usuario");

          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);

  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
      <option value="" disabled>
        Seleccione un estado
      </option>
      <option value="autorizado" className="text-green-500">
        Autorizado
      </option>
      <option value="pendiente" className="text-yellow-500">
        Pendiente
      </option>
      <option value="rechazado" className="text-red-500">
        Rechazado
      </option>
    </select>
  );
};

export default Users;
