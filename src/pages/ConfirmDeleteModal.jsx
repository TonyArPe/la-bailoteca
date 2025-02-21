import React from "react";
import { deleteClase } from "../services/api";
import { useNavigate } from "react-router-dom";
//import "../styles/FormStyles.css"

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
    navigate("/")
  }


  return (
    <div className="modal">
      <p>¿Estás seguro de que deseas eliminar esta clase?</p>
      <button onClick={handleDelete}>Sí, eliminar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default ConfirmDeleteModal;