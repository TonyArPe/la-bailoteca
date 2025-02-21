const EditClaseForm = ({ clase, categoriasLista, nivelesLista, onClose }) => {
  const [nombre, setNombre] = useState(clase.nombre);
  const [descripcion, setDescripcion] = useState(clase.descripcion);
  const [profesores, setProfesores] = useState(clase.profesores);
  const [categoria, setCategoria] = useState(clase.categoriasLista);
  const [nivel, setNivel] = useState(clase.nivelesLista);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const claseActualizada = {
      ...clase,
      nombre,
      descripcion,
      profesores,
      niveles,
      categorias,
    };
    await claseActualizadaInDatabase(claseActualizada);
    onClose();
  };

  return (
    <div className="edit-form">
      <h2>EDITAR CLASE</h2>
      <FormGroup>
        <Form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            placeholder="Nombre:"
            onChange={(e) => setNombre(e.target.value)} > 
            </input>
          </Form>
      </FormGroup>
      
      <FormGroup>
        <Form>
        <label>Descripcion:</label>
                <textarea
                  type="text"
                  value={descripcion}
                  placeholder="Descripcion:"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
        </Form>
      </FormGroup>

        
      <FormGroup>
        <Form>
        <label>Profesores:</label>
        <input
          type="text"
          value={profesores}
          placeholder="Profesores:"
          onChange={(e) => setProfesores(e.target.value)}
        />
        </Form>
      </FormGroup>

        <div>
          <h3>Niveles</h3>
          {nivelesLista.map((nivel) => (
            <label key={nivel.id}>
              <input
                type="checkbox"
                checked={niveles.includes(nivel.id)}
                onChange={() =>
                  setNiveles((prev) =>
                    prev.includes(nivel.id)
                      ? prev.filter((id) => id !== nivel.id)
                      : [...prev, nivel.id]
                  )
                }
              />
              {nivel.nombre}
            </label>
          ))}
        </div>
        <div>
          <h3>Categorías</h3>
          {categoriasLista.map((categoria) => (
            <label key={categoria.id}>
              <input
                type="checkbox"
                checked={categorias.includes(categoria.id)}
                onChange={() =>
                  setCategorias((prev) =>
                    prev.includes(categoria.id)
                      ? prev.filter((id) => id !== categoria.id)
                      : [...prev, categoria.id]
                  )
                }
              />
              {categoria.nombre}
            </label>
          ))}
        </div>
        <div>
          <button type="submit">Actualizar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
    </div>
  );
};

export default EditClaseForm;
