import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import { crearVenta } from "utils/api";
import {
  obtenerProductos,
  obtenerUsuarios,
  obtenerVenta,
  editarVenta,
  eliminarVenta,
} from "utils/api";
import Table from "react-bootstrap/Table";
import PrivateComponent from "components/PrivateComponent";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip, Dialog } from "@material-ui/core";
import ReactLoading from "react-loading";

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosTabla, setProductosTabla] = useState([]);
  const [textoBoton, setTextoBoton] = useState("añadir producto nuevo");
  const [mostrarTabla, setMostrarTabla] = useState(true);

  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  // renderizacion condicional
  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("añadir producto nuevo");
    } else {
      setTextoBoton("mostrar Tabla Productos");
    }
  }, [mostrarTabla]);
  // obtener usuarios y productos
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

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log("form data", formData);

    const listaProductos = Object.keys(formData)
      .map((k) => {
        if (k.includes("producto")) {
          return productosTabla.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    const datosVenta = {
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
      cantidad: formData.valor,
      productos: listaProductos,
    };

    await crearVenta(
      datosVenta,
      (response) => {
        console.log(response);
        toast.success("Venta agregada con Exito");
        setMostrarTabla(true);
      },
      (error) => {
        console.error(error);
        toast.error("Ups la venta no se pudo agregar");
      }
    );
  };

  return (
    <div className="d-flex h-100 w-100 center flex-col">
      <h1 className="text-3xl font-extrabold text-gray-900 my-3">
        Administrar Ventas
      </h1>
      <button
        onClick={() => {
          setMostrarTabla(!mostrarTabla);
        }}
      >
        {textoBoton}
      </button>
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
      {mostrarTabla ? (
        <TablaVentas
          listaVentas={ventas}
          loading={loading}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <form
          ref={form}
          onSubmit={submitForm}
          className="d-flex flex-col h-100"
        >
          <label className="flex flex-col" htmlFor="vendedor">
            <span className="text-2xl font-gray-900">Vendedor</span>
            <select name="vendedor" className="p-2" defaultValue="" required>
              <option disabled value="">
                Seleccione un Vendedor
              </option>
              {vendedores.map((el) => {
                return (
                  <option key={nanoid()} value={el._id}>{`${el.name}`}</option>
                );
              })}
            </select>
          </label>

          <TablaProductos
            productos={productos}
            setProductos={setProductos}
            setProductosTabla={setProductosTabla}
          />

          <button type="submit" className="">
            Crear Venta
          </button>
        </form>
      )}
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
  }, [busqueda, listaVentas]);
  return (
    <>
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
                <tr>
                  <td>{venta._id}</td>
                  <td>{venta.vendedor.name}</td>
                  <td>{venta.productos.nombre}</td>
                  <td>{venta.productos.length}</td>
                  <td>{venta.productos.precio}</td>
                  <td>edit delete</td>
                </tr>
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
          <span>hola</span>
        </>
      ) : (
        <>
          <td>{venta._id.slice(20)}</td>
          <td>{venta.vendedor.name}</td>
          <td>{venta.productos.nombre}</td>
          <td>{venta.productos.length}</td>
          <td>{venta.productos.precio}</td>
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
const TablaProductos = ({ productos, setProductos, setProductosTabla }) => {
  const [productoAAgregar, setProductoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);

  useEffect(() => {
    setProductosTabla(filasTabla);
  }, [filasTabla, setProductosTabla]);

  const agregarNuevoProducto = () => {
    setFilasTabla([...filasTabla, productoAAgregar]);
    setProductos(productos.filter((v) => v._id !== productoAAgregar._id));
    setProductoAAgregar({});
  };

  const eliminarProducto = (productoAEliminar) => {
    setFilasTabla(filasTabla.filter((v) => v._id !== productoAEliminar._id));
    setProductos([...productos, productoAEliminar]);
  };

  const modificarProducto = (producto, cantidad) => {
    setFilasTabla(
      filasTabla.map((ft) => {
        if (ft._id === producto.id) {
          ft.cantidad = cantidad;
          ft.total = producto.valor * cantidad;
        }
        return ft;
      })
    );
  };

  return (
    <div>
      <div className="d-flex ">
        <label className="d-flex d-flex-row" htmlFor="producto">
          <select
            className="p-2"
            name="producto"
            value={productoAAgregar._id ?? ""}
            onChange={(e) =>
              setProductoAAgregar(
                productos.filter((v) => v._id === e.target.value)[0]
              )
            }
          >
            <option disabled value="">
              Seleccione un Producto
            </option>
            {productos.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.nombre}, ${el.categoria}, $${el.precio}`}</option>
              );
            })}
          </select>
        </label>
        <button
          type="button"
          onClick={() => agregarNuevoProducto()}
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
        >
          Agregar Producto
        </button>
      </div>
      <Table className="margin-top-15" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Total</th>
            <th>Eliminar</th>
            <th className="d-none">Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              <FilaProducto
                key={el._id.slice(20)}
                prod={el}
                index={index}
                eliminarProducto={eliminarProducto}
                modificarProducto={modificarProducto}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

const FilaProducto = ({ prod, index, eliminarProducto, modificarProducto }) => {
  const [producto, setProducto] = useState(prod);
  useEffect(() => {
    console.log("prod", producto);
  }, [producto]);
  return (
    <tr>
      <td>{producto._id}</td>
      <td>{producto.nombre}</td>
      <td>{producto.categoria}</td>
      <td>
        <label htmlFor={`cantidad_${index}`}>
          <input
            type="number"
            min={1}
            max={100}
            name={`cantidad_${index}`}
            value={producto.cantidad}
            onChange={(e) => {
              modificarProducto(
                producto,
                e.target.value === "" ? "0" : e.target.value
              );
              setProducto({
                ...producto,
                cantidad: e.target.value === "" ? "0" : e.target.value,
                total:
                  parseFloat(producto.precio) *
                  parseFloat(e.target.value === "" ? "0" : e.target.value),
              });
            }}
          />
        </label>
      </td>
      <td>{producto.precio}</td>
      <td>{parseFloat(producto.total ?? 0)}</td>
      <td>
        <i
          onClick={() => eliminarProducto(producto)}
          className="fas fa-minus text-red-500 cursor-pointer"
        />
      </td>
      <td className="d-none">
        <input hidden defaultValue={producto._id} name={`producto_${index}`} />
      </td>
    </tr>
  );
};

export default Ventas;
