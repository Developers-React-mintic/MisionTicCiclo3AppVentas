import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Table from "react-bootstrap/Table";
import PrivateComponent from "components/PrivateComponent";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip, Dialog } from "@material-ui/core";
import {
  obtenerProductos,
  obtenerUsuarios,
  obtenerVenta,
  editarVenta,
  eliminarVenta,
} from "utils/api";
const Ventas1 = () => {
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  // obtener ventas
  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true);
      await obtenerVenta(
        (response) => {
          console.log("la respuesta ventas: ", response);
          setVentas(response.data);
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
      fetchVentas();
    }
  }, [ejecutarConsulta]);
  return (
    <div>
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
      <TablaVentas
        listaVentas={ventas}
        loading={loading}
        setEjecutarConsulta={setEjecutarConsulta}
      />
    </div>
  );
};
const TablaVentas = ({ loading, listaVentas, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);

  useEffect(() => {
    setVentasFiltradas(
      listaVentas.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
    console.log(busqueda, listaVentas);
  }, [busqueda, listaVentas]);
  return (
    <>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      {loading ? (
        <ReactLoading
          className="center"
          type="cylon"
          color="#242424"
          height={667}
          width={375}
        />
      ) : (
        <Table className="margin-top-15" striped bordered hover variant="dark">
          <thead className="container h-200">
            <tr>
              <th>ID venta</th>
              <th>Vendedor</th>
              <th>Producto</th>
              <th>Cantidad productos</th>
              <th>Total venta</th>
              <PrivateComponent roleList={["admin"]}>
                <th className="w-125">Gestionar</th>
              </PrivateComponent>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.map((venta) => {
              return (
                <FilaVentas
                  key={nanoid()}
                  venta={venta}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};
const FilaVentas = ({ venta, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevaVenta, setinfoNuevaVenta] = useState({
    _id: venta._id,
    nombre: venta.vendedor.name,
    categoria: venta.productos.length,
    precio: venta.productos.precio,
  });
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuarios(
        (response) => {
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchProductos = async () => {
      await obtenerProductos(
        (response) => {
          setProductos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchProductos();
  }, []);
  const actualizarVentas = async () => {
    await editarVenta(
      venta._id,
      {
        nombre: infoNuevaVenta.nombre,
        categoria: infoNuevaVenta.categoria,
        precio: infoNuevaVenta.precio,
      },
      (response) => {
        console.log(response.data);
        toast.success("Venta modificado con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error modificando la venta");
        console.error(error);
      }
    );
  };

  const deleteVenta = async () => {
    await eliminarVenta(
     venta._id,
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
          <td>{infoNuevaVenta._id}</td>
          <td>
            <select
              name="vendedor"
              className="p-2"
              defaultValue=""
              required
              onChange={(e) => {
                console.log("opt value", e.target.value);
              }}
            >
              <option disabled value="" selected>
                Seleccione un Vendedor
              </option>
              {vendedores.map((el) => {
                return (
                  <option key={nanoid()} value={el._id}>{`${el.name}`}</option>
                );
              })}
            </select>
          </td>
          <td>
            <select
              name="vendedor"
              className="p-2"
              defaultValue=""
              required
              onChange={(e) => {
                console.log("opt value", e.target.value);
              }}
            >
              <option disabled value="" selected>
                Seleccione un Producto

              </option>
              {productos.map((p) => {
                return (
                  <option key={nanoid()} value={p._id}>{`${p.nombre}`}</option>
                );
              })}
            </select>
          </td>
          <td>
            <input
              className=""
              type="number"
              min={1}
              max={100}
              value={infoNuevaVenta.precio}
              onChange={(e) =>
                setinfoNuevaVenta({
                  ...infoNuevaVenta,
                  precio: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className=""
              type="number"
              min={1}
              max={100}
              value={productos.precio}
              onChange={(e) =>
                setinfoNuevaVenta({
                  ...infoNuevaVenta,
                  precio: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{venta._id.slice(20)}</td>
          <td>{venta.vendedor.name}</td>
          <td>{venta.productos.categoria}</td>
          <td>{venta.productos.length}</td>
          <td>{venta.cantidad}</td>
        </>
      )}
      <PrivateComponent roleList={["admin"]}>
        <td>
          <div className="d-flex w-full justify-content-around">
            {edit ? (
              <>
                <Tooltip title="Confirmar Edición" arrow>
                  <i
                    className="fas fa-check cursor-pointer"
                    onClick={() => actualizarVentas()}
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
                    className="fas fa-pencil-alt cursor-pointer"
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
                  onClick={() => deleteVenta()}
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
export default Ventas1;
