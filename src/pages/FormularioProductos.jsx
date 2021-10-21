const FormularioProductos = () => {
  return (
    <div className="form-container">
      <form className="form-add-product" onChange="" onSubmit="">
        <h2>Formulario para agregar productos</h2>
        <div className="form-group">
          <label htmlFor="productType">Tipo de producto</label>
          <input required id="productType" type="text" />
        </div>
        <div className="opt-group">
          <select name="" id="" required defaultValue="">
            <option value="" disabled selected>
              selecciona una marca
            </option>
            <option value="polo">Polo</option>
            <option value="Jordan">Jordan</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio (Unidad)</label>
          <input required id="price" type="number" />
        </div>
        <div className="form-group">
          <label htmlFor="size">Talla</label>
          <input required id="size" type="text" />
        </div>
        <div className="btn">
          <button type="submit">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
};
export default FormularioProductos;
