import React from "react";
import { deleteClase } from "../services/api";

const ConfirmDeleteModal = ({ claseId, onClose }) => {
  const handleDelete = async () => {
    try {
      await deleteClase(claseId);
      onClose(); 
    } catch (error) {
      console.error("Error eliminando la clase:", error);
    }
  };

  return (
    <div className="modal">
      <p>¿Estás seguro de que deseas eliminar esta clase?</p>
      <button onClick={handleDelete}>Sí, eliminar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ConfirmDeleteModal;