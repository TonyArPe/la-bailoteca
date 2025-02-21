import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClases, updateClase } from "../services/api";
//import "../styles/FormStyles.css"

const EditClase = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchClase = async () => {
      try {
        const clases = await getClases();
        const claseEncontrada = clases.find((clase) => clase.id.toString() === id);

        if (claseEncontrada) {
          setFormData(claseEncontrada);
        } else {
          console.error("Clase no encontrada");
        }
      } catch (error) {
        console.error("Error obteniendo la clase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClase();
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClase(formData);
      navigate("/"); // Redirige a Home después de guardar
    } catch (error) {
      console.error("Error actualizando la clase:", error);
    }
  };

  // Manejar la cancelación
  const handleCancelar = (e) => {
    e.preventDefault();
    navigate("/"); // Redirige a Home al cancelar
  };

  
  if (loading) {
    return <p>Cargando clase...</p>;
  }

  
  if (!formData) {
    return <p>No se encontró la clase.</p>;
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="profesores"
          value={formData.profesores}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="video"
          value={formData.video}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar</button>
        <button type="button" onClick={handleCancelar}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditClase;
