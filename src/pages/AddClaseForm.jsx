import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClase } from "../services/api";
import "../styles/AddClaseStyles.css";

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

  const handleCancelar = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="add-clase-form-container">
      <h1>Añadir Nueva Clase</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la clase"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="add-clase-input"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
          className="add-clase-textarea"
        />
        <input
          type="text"
          name="profesores"
          placeholder="Profesores"
          value={formData.profesores}
          onChange={handleChange}
          required
          className="add-clase-input"
        />
        <input
          type="text"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
          className="add-clase-input"
        />
        <input
          type="text"
          name="duracion"
          placeholder="Duración"
          value={formData.duracion}
          onChange={handleChange}
          required
          className="add-clase-input"
        />
        <input
          type="url"
          name="imagen"
          placeholder="URL de la imagen"
          value={formData.imagen}
          onChange={handleChange}
          required
          className="add-clase-input"
        />
        <input
          type="url"
          name="video"
          placeholder="URL del video"
          value={formData.video}
          onChange={handleChange}
          required
          className="add-clase-input"
        />
        <button type="submit" className="add-clase-button submit">Añadir Clase</button>
        <button type="button" onClick={handleCancelar} className="add-clase-button cancel">
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default AddClaseForm;
