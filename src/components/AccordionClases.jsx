import { useState } from "react";
import { Link } from "react-router-dom";
import EditClaseForm from "../pages/EditClase";
import ConfirmDeleteModal from "../pages/ConfirmDeleteModal";

const AccordionClases = ({ clase, categoriasLista = [], nivelesLista = [], onDelete, onUpdate, deleteClase, updateClase }) => {
    const [desplegado, setDesplegado] = useState(false);
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const [modal, setModal] = useState({ edit: false, remove: false });

    const handleEditClick = (e) => {
        e.stopPropagation();
        setModal({ ...modal, edit: true });
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        setModal({ ...modal, remove: true });
    };

    const handleDelete = async () => {
        try {
            await deleteClase(clase.id);
            onDelete(clase.id);
            handleClose();
        } catch (error) {
            console.error("Error eliminando la clase:", error);
        }
    };

    const handleUpdate = async (updatedClase) => {
        try {
            await updateClase(updatedClase);
            onUpdate(updatedClase);
            handleClose();
        } catch (error) {
            console.error("Error actualizando la clase:", error);
        }
    };

    const handleClose = () => setModal({ edit: false, remove: false });

    const getNombre = (ids, lista) => {
        if (!Array.isArray(ids)) return "No disponible";
        return lista
            .filter((item) => ids.includes(item.id))
            .map((item) => item.nombre)
            .join(", ") || "No disponible";
    };

    const convertToEmbedUrl = (url) => {
        if (!url) return "";
        const videoId = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url;
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={() => setDesplegado(!desplegado)}>
                <h2>{clase.nombre}</h2>
                <p><strong>Profesores:</strong> {clase.profesores}</p>
                <p><strong>Categorías:</strong> {getNombre(clase.categorias, categoriasLista)}</p>
                <p><strong>Niveles:</strong> {getNombre(clase.niveles, nivelesLista)}</p>
                <p><strong>Precio:</strong> {clase.precio}</p>
                <div className="image-container">
                    <img src={clase.imagen} alt={clase.nombre} className="accordion-image" />
                </div>
                <button className="accordion-toggle">
                    {desplegado ? "Cerrar" : "Ver más"}
                </button>

                <div className="button-group">
                    <Link to={`/edit-clase/${clase.id}`}>
                        <button>Editar</button>
                    </Link>
                    <button onClick={handleRemoveClick}>Eliminar</button>
                </div>
            </div>

            {desplegado && (
                <div className="accordion-content">
                    <p><strong>Descripción:</strong> {clase.descripcion}</p>
                    <button className="video-button" onClick={() => setMostrarVideo(true)}>
                        Ver Video
                    </button>
                </div>
            )}

            {mostrarVideo && (
                <div className="video-dialog">
                    <div className="video-content">
                        <button className="close-button" onClick={() => setMostrarVideo(false)}>
                            X Cerrar Video
                        </button>
                        <iframe
                            width="560"
                            height="315"
                            src={convertToEmbedUrl(clase.video)}
                            title="Video de la clase"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {modal.edit && (
                <EditClaseForm
                    clase={clase}
                    categoriasLista={categoriasLista}
                    nivelesLista={nivelesLista}
                    onClose={handleClose}
                    onUpdate={handleUpdate}
                />
            )}

            {modal.remove && (
                <ConfirmDeleteModal
                    claseId={clase.id}
                    onClose={handleClose}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default AccordionClases;
