// Tienda de bitácoras (stores/bitacoras.js)
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { Notify } from "quasar";

export const useBitacoraStore = defineStore("bitacora", () => {
  let token = ref("");

  // Actualizar estado
  const actualizarEstado = async (id, estado) => {  // Cambiar aquí para aceptar 'estado'
    try {
      let r = await axios.put(`http://localhost:5037/api/Bitacoras/estado/${id}`, { estado });  // Enviar el estado en el cuerpo de la solicitud
      console.log(r);
      return r.data;  // Retornar la respuesta actualizada
    } catch (error) {
      console.error("Error al actualizar el estado de la bitácora:", error);
      Notify.create({
        message: "Error al actualizar el estado de la bitácora.",
        color: "negative",
      });
      return error;
    }
  };

  // Función para listar bitácoras en un rango de fechas
  const listarBitacorasXFecha = async (inicio, fin) => {
    try {
      let r = await axios.get(`http://localhost:5037/api/Bitacoras/bitacora/${inicio}/${fin}`);
      console.log(r);
      return r.data; // Retornamos solo los datos relevantes
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Error al listar bitácoras por fecha.",
        color: "negative",
      });
      return error; 
    }
  };

  // Función para listar bitácoras por IdAprendis
  const listarXIdAprendis = async (IdAprendis, fechaInicio, fechaFin) => {
    try {
      let r = await axios.get(`http://localhost:5037/api/Bitacoras/listarBitacora/${IdAprendis}/${fechaInicio}/${fechaFin}`);
      console.log(r);
      return r.data;
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Error al listar bitácoras por IdAprendis.",
        color: "negative",
      });
      return error;
    }
  };

  // Función para listar bitácoras por IdFicha
  const listarXIdFicha = async (IdFicha, fechaInicio, fechaFin) => {
    try {
      let r = await axios.put(`
        http://localhost:5037/api/Bitacoras/ListarbitacoraIdFicha/${IdFicha}/${fechaInicio}/${fechaFin}`
      );
      console.log(r);
      return r.data;
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Error al listar bitácoras por IdFicha.",
        color: "negative",
      });
      return error;
    }
  };

  return {
    token,
    listarBitacorasXFecha,
    listarXIdAprendis,
    listarXIdFicha,
    actualizarEstado
  };
}, { persist: true });