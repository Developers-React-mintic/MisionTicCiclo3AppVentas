import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const trashCan = <FontAwesomeIcon icon={faTrashCan} />;
const pencil = <FontAwesomeIcon icon={faPencil} />;

const productosBack = [
  {
    nombre: "Clavos",
    categoria: "comun",
    precio: "100",
  },
  {
    nombre: "lavamanos",
    categoria: "ducha",
    precio: "50000",
  },
];

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("añadir producto nuevo");
  const [colorBoton, setcolorBoton] = useState("btn-tabla");

  useEffect(() => {
    // obtener productos desde el back
    setProductos(productosBack);
  }, []);

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
        <TablaProductos listaProductos={productos} />
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

const TablaProductos = ({ listaProductos }) => {
  useEffect(() => {
    console.log(
      "listado de productos en el componente de la tabla",
      listaProductos
    );
  }, [listaProductos]);

  return (
    <>
      <div className="d-sm-none d-md-block">
        <Table className="margin-top-15" striped bordered hover variant="dark">
          <thead className="container h-200">
            <tr>
              <th>ID</th>
              <th>nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Gestionar</th>
            </tr>
          </thead>
          <tbody>
            {listaProductos.map((producto) => {
              return (
                <tr>
                  <td>key</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.precio}</td>
                  <th>
                    <i className="pencil cursor-pointer">{pencil}</i>
                    <i className="trash cursor-pointer">{trashCan}</i>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="d-sm-block d-md-none">
        {listaProductos.map((producto) => {
          return (
            <div className="d-flex flex-col shadow margin-top-15">
              <span>ID: key</span>
              <span>Nombre: {producto.nombre}</span>
              <span>Categoria: {producto.categoria}</span>
              <span>Precia: {producto.precio}</span>
              <div>
                <i className="pencil cursor-pointer">{pencil}</i>
                <i className="trash cursor-pointer">{trashCan}</i>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const FormularioAggProductos = ({
  setMostrarTabla,
  listaProductos,
  setProductos,
}) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const productoNuevo = {};
    formData.forEach((value, key) => {
      productoNuevo[key] = value;
    });

    setProductos([...listaProductos, productoNuevo]);
    setMostrarTabla(true);
    console.log("datos del form", productoNuevo);
    // toast.success('se ha agregado correctamente el producto')
    // toast.error('Ups hubo un error inesperado')
  };
  return (
    <div className="d flex   form-container">
      <form ref={form} onSubmit={submitForm} className="form-add-product">
        <h2>Formulario para agregar productos</h2>
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
          <select name="categoria" id="" required defaultValue="">
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
            Precio (Unidad)
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
