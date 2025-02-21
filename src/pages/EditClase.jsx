import React, { useState } from "react";
import { updateClase } from "../services/api"; // Asegúrate de crear esta función en tu API

const EditClaseForm = ({ clase, onClose }) => {
  const [formData, setFormData] = useState(clase);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClase(formData);
      onClose();
    } catch (error) {
      console.error("Error actualizando la clase:", error);
    }
  };

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
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditClaseForm;