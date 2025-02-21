import axios from "axios";

const API_URL = "http://localhost:5000";

export const getClases = async () => {
  try {
    const response = await axios.get(`${API_URL}/clases`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las clases", error);
    return [];
  }
};

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías", error);
    return [];
  }
};

export const getNiveles = async () => {
  try {
    const response = await axios.get(`${API_URL}/niveles`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los niveles", error);
    return [];
  }
};

export const addClase = async (clase) => {
  try {
    const response = await axios.post(`${API_URL}/clases`, clase);
    return response.data;
  } catch (error) {
    console.error("Error añadiendo la clase", error);
    throw error;
  }
};

export const updateClase = async (clase) => {
  try {
    const response = await axios.put(`${API_URL}/clases/${clase.id}`, clase);
    return response.data;
  } catch (error) {
    console.error("Error actualizando la clase", error);
    throw error;
  }
};

export const deleteClase = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/clases/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando la clase", error);
    throw error;
  }
};