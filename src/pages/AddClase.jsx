import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClase } from "../services/api";

function AddClaseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    profesores: "",
    niveles: [],
    categorias: [],
    precio: "",
    duracion: "",
    imagen: "",
    video: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addClase(formData);
      navigate("/");
    } catch (error) {
      console.error("Error añadiendo la clase:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Añadir Nueva Clase</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la clase"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="profesores"
          placeholder="Profesores"
          value={formData.profesores}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duracion"
          placeholder="Duración"
          value={formData.duracion}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="imagen"
          placeholder="URL de la imagen"
          value={formData.imagen}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="video"
          placeholder="URL del video"
          value={formData.video}
          onChange={handleChange}
          required
        />
        <button type="submit">Añadir Clase</button>
      </form>
    </div>
  );
}

export default AddClaseForm;