import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";
import {
  crearProducto,
  editarProducto,
  eliminarProducto,
  obtenerProductos,
} from "utils/api";
import PrivateComponent from "components/PrivateComponent";
import { Tooltip, Dialog } from "@material-ui/core";
import ReactLoading from "react-loading";

// const productosBack = [
//   {
//     nombre: "Clavos",
//     categoria: "comun",
//     precio: "100",
//   },
//   {
//     nombre: "lavamanos",
//     categoria: "ducha",
//     precio: "50000",
//   },
// ];

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("añadir producto nuevo");
  const [colorBoton, setcolorBoton] = useState("btn-tabla");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      await obtenerProductos(
        (response) => {
          console.log("la respuesta fue: ", response);
          setProductos(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.log("salio un error: ", error);
          setLoading(false);
        }
      );
    };
    console.log("consulta: ", ejecutarConsulta);
    if (ejecutarConsulta) {
      fetchProductos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("añadir producto nuevo");
      setcolorBoton("btn-tabla");
    } else {
      setTextoBoton("mostrar Tabla Productos");
      setcolorBoton("btn-form");
    }
  }, [mostrarTabla]);

  return (
    <>
      <h1 className="title">Administrar productos</h1>
      <div className="btn-toggle">
        <button
          className={`${colorBoton}`}
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos
          listaProductos={productos}
          loading={loading}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <FormularioAggProductos
          listaProductos={productos}
          setProductos={setProductos}
          setMostrarTabla={setMostrarTabla}
        />
      )}

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
    </>
  );
};

const TablaProductos = ({ loading, listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  useEffect(() => {
    setProductosFiltrados(
      listaProductos.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <div className="d-flex flex-col w-full">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      <h2 className="text-2xl font-extrabold text-gray-800">
        Todos nuestros Productos
      </h2>

      <div className="d-sm-none d-md-flex">
        {loading ? (
          <ReactLoading type="cylon" color="#abc123" height={667} width={375} />
        ) : (
          <Table
            className="margin-top-15"
            striped
            bordered
            hover
            variant="dark"
          >
            <thead className="container h-200">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <PrivateComponent roleList={["admin"]}>
                  <th>Gestionar</th>
                </PrivateComponent>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => {
                return (
                  <FilaProducto
                    key={nanoid()}
                    producto={producto}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
      <div className="d-sm-flex flex-col w-full d-md-none">
        {productosFiltrados.map((el) => {
          return (
            <div className="d-flex flex-col shadow margin-top-15">
              <span> {el.nombre}</span>
              <span> {el.categoria}</span>
              <span> {el.precio}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setinfoNuevoProducto] = useState({
    _id: producto._id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: producto.precio,
  });

  const actualizarProducto = async () => {
    await editarProducto(
      producto._id,
      {
        nombre: infoNuevoProducto.nombre,
        categoria: infoNuevoProducto.categoria,
        precio: infoNuevoProducto.precio,
      },
      (response) => {
        console.log(response.data);
        toast.success("Producto modificado con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error modificando el producto");
        console.error(error);
      }
    );
  };

  const deleteProduct = async () => {
    await eliminarProducto(
      producto._id,
      (response) => {
        console.log(response.data);
        toast.success("Producto eliminado con éxito");
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error eliminando el Producto");
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoProducto._id}</td>
          <td>
            <input
              className=""
              type="text"
              value={infoNuevoProducto.nombre}
              onChange={(e) =>
                setinfoNuevoProducto({
                  ...infoNuevoProducto,
                  nombre: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className=""
              type="text"
              value={infoNuevoProducto.categoria}
              onChange={(e) =>
                setinfoNuevoProducto({
                  ...infoNuevoProducto,
                  categoria: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className=""
              type="number"
              min={100}
              max={2000000}
              value={infoNuevoProducto.precio}
              onChange={(e) =>
                setinfoNuevoProducto({
                  ...infoNuevoProducto,
                  precio: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td> {producto._id.slice(20)} </td>
          <td>{producto.nombre}</td>
          <td>{producto.categoria}</td>
          <td>{producto.precio}</td>
        </>
      )}
      <PrivateComponent role={["admin"]}>
        <td>
          <div className="d-flex w-full">
            {edit ? (
              <>
                <Tooltip title="Confirmar Edición" arrow>
                  <i
                    className="fas fa-check cursor-pointer"
                    onClick={() => actualizarProducto()}
                  />
                </Tooltip>
                <Tooltip title="Cancelar Edición" arrow>
                  <i className="fas fa-ban" onClick={() => setEdit(!edit)} />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Editar Producto" arrow>
                  <i
                    className="fas fa-pencil cursor-pointer"
                    onClick={() => setEdit(!edit)}
                  />
                </Tooltip>
                <Tooltip title="Eliminar Producto" arrow>
                  <i
                    className="fas fa-trash cursor-pointer"
                    onClick={() => setOpenDialog(true)}
                  />
                </Tooltip>
              </>
            )}
          </div>
          <Dialog open={openDialog}>
            <div className="p-8 flex flex-col">
              <h1 className="text-gray-900 text-2xl font-bold">
                ¿Está seguro de querer eliminar el Producto?
              </h1>
              <div className="d-flex w-full items-center justify-center my-4">
                <button
                  onClick={() => deleteProduct()}
                  className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
                >
                  Sí
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
                >
                  No
                </button>
              </div>
            </div>
          </Dialog>
        </td>
      </PrivateComponent>
    </tr>
  );
};
const FormularioAggProductos = ({ setMostrarTabla }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const productoNuevo = {};
    formData.forEach((value, key) => {
      productoNuevo[key] = value;
    });
    await crearProducto(
      {
        nombre: productoNuevo.nombre,
        categoria: productoNuevo.categoria,
        precio: productoNuevo.precio,
      },
      (response) => {
        console.log(response.data);
        toast.success("Producto agregado con éxito");
      },
      (error) => {
        console.error(error);
        toast.error("Error creando un producto");
      }
    );

    setMostrarTabla(true);
  };
  return (
    <div className="d flex   form-container">
      <form ref={form} onSubmit={submitForm} className="form-add-product">
        <h2>agregar productos</h2>
        <div className="form-group">
          <label className="d-flex flex-col" htmlFor="nombre">
            Nombre del producto
          </label>
          <input required name="nombre" placeholder="clavos" type="text" />
        </div>
        <div className="opt-group">
          <label className="d-flex flex-col" htmlFor="categoria">
            Categoria del producto
          </label>
          <select name="categoria" required defaultValue="">
            <option value="" disabled selected>
              selecciona una categoria
            </option>
            <option value="Basica">Basica</option>
            <option value="Material">Material</option>
            <option value="Ducha">Ducha</option>
          </select>
        </div>
        <div className="form-group">
          <label className="d-flex flex-col" htmlFor="precio">
            Precio
          </label>
          <input
            required
            min={100}
            max={2000000}
            placeholder="100"
            name="precio"
            type="number"
          />
        </div>
        <div className="btn-submit">
          <button type="submit">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
};
export default Productos;
