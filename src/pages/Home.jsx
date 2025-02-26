import { useEffect, useState } from "react";
import { getClases, getCategorias, getNiveles } from "../services/api";
import AccordionClases from "../components/AccordionClases";
import { Link } from "react-router-dom";

import "../styles/Styles.css";
import "../styles/Spinner.css";

import Footer from "../components/Footer";
import Header from "../components/Header";


function Home() {
  const [clases, setClases] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaProfesor, setBusquedaProfesor] = useState("");
  const [filtroCategorias, setFiltroCategorias] = useState([]);
  const [filtroNiveles, setFiltroNiveles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [dataClases, dataCategorias, dataNiveles] = await Promise.all([
          getClases(),
          getCategorias(),
          getNiveles(),
        ]);
        setClases(dataClases);
        setCategorias(dataCategorias);
        setNiveles(dataNiveles);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Función para eliminar una clase
  const handleDeleteClase = (id) => {
    setClases((prevClases) => prevClases.filter((clase) => clase.id !== id));
  };

  // Función para actualizar una clase
  const handleUpdateClase = (updatedClase) => {
    setClases((prevClases) =>
      prevClases.map((clase) =>
        clase.id === updatedClase.id ? updatedClase : clase
      )
    );
  };

  const toggleFiltro = (id, setFiltro) => {
    setFiltro((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const quitarAcentos = (texto) =>
    texto.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const clasesFiltradas = clases.filter((clase) => {
    const coincideBusqueda =
      busqueda.trim() === "" ||
      quitarAcentos(clase.nombre.toLowerCase()).includes(
        quitarAcentos(busqueda.toLowerCase())
      ) ||
      quitarAcentos(clase.descripcion.toLowerCase()).includes(
        quitarAcentos(busqueda.toLowerCase())
      );

    const coincideProfesor =
      busquedaProfesor.trim() === "" ||
      quitarAcentos(clase.profesores.toLowerCase()).includes(
        quitarAcentos(busquedaProfesor.toLowerCase())
      );

    const perteneceCategoria =
      filtroCategorias.length === 0 ||
      clase.categorias.some((cat) => filtroCategorias.includes(cat));

    const perteneceNivel =
      filtroNiveles.length === 0 ||
      clase.niveles.some((niv) => filtroNiveles.includes(niv));

    return (
      coincideBusqueda &&
      coincideProfesor &&
      perteneceCategoria &&
      perteneceNivel
    );
  });

  return (
    <div>
      <Header />
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Cargando datos...</p>
        </div>
      ) : (
        <>
        <div className="add-class-button">
          <Link to="/add-clase">
            Añadir Nueva Clase
          </Link>
        </div>

          <h2>Filtrar por Clases</h2>
          <input
            type="text"
            placeholder="Buscar clases..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <h2>Buscar por Profesores</h2>
          <input
            type="text"
            placeholder="Buscar profesor..."
            value={busquedaProfesor}
            onChange={(e) => setBusquedaProfesor(e.target.value)}
          />

          <div>
            <h2>Filtrar por Categorías</h2>
            {categorias.map((categ) => (
              <label key={categ.id}>
                <input
                  type="checkbox"
                  checked={filtroCategorias.includes(categ.id)}
                  onChange={() => toggleFiltro(categ.id, setFiltroCategorias)}
                />
                {categ.nombre}
              </label>
            ))}
          </div>

          <div>
            <h2>Filtrar por Niveles</h2>
            {niveles.map((nivel) => (
              <label key={nivel.id}>
                <input
                  type="checkbox"
                  checked={filtroNiveles.includes(nivel.id)}
                  onChange={() => toggleFiltro(nivel.id, setFiltroNiveles)}
                />
                {nivel.nombre}
              </label>
            ))}
          </div>

          <ul>
            {clasesFiltradas.length > 0 ? (
              clasesFiltradas.map((clase) => (
                <AccordionClases
                  key={clase.id}
                  clase={clase}
                  categoriasLista={categorias}
                  nivelesLista={niveles}
                  onDelete={
                  <Link to="/delete-clase">
                    <button>Borrar Clase</button>
                  </Link>
                  }
                  onUpdate={
                  <Link to="/edit-clase">
                  <button>Editar Clase</button>
                </Link>
                }
                />
              ))
            ) : (
              <p>No hay clases disponibles con estos filtros.</p>
            )}
          </ul>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;