import React from "react";
import { deleteClase } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/ConfirmDeleteStyles.css";

const ConfirmDeleteModal = ({ claseId, onClose }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteClase(claseId);
      onClose(); 
    } catch (error) {
      console.error("Error eliminando la clase:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="confirm-delete-modal">
      <p>¿Estás seguro de que deseas eliminar esta clase?</p>
      <div className="confirm-delete-buttons">
        <button onClick={handleDelete} className="confirm-delete-button delete">Sí, eliminar</button>
        <button onClick={handleCancel} className="confirm-delete-button cancel">Cancelar</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
