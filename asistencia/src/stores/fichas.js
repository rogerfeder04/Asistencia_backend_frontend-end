import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { Notify } from "quasar";



export const useFichaStore = defineStore("ficha", () => {
  let token = ref("");
  const listarFichas = async () => {
    try {
      let r = await axios.get("http://localhost:5037/api/Fichas/listar");
      console.log(r);
      return r;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const activarDesactivarFichas = async (id) => {
    console.log("ID de la ficha:", id);
    try {
      let r = await axios.put(
        `http://localhost:5037/api/Fichas/activarDesactivar/${id}`
      );
      console.log("Respuesta del servidor:", r);
  
      // Suponiendo que el mensaje indica si la ficha se activó o desactivó
      const mensaje = r.data.msg;
      
      if (mensaje.includes("Ficha activada correctamente")) {
        Notify.create({
          color: "positive",
          message: mensaje,
          icon: "check_circle",
          timeout: 2500,
        });
        console.log(mensaje)
      } else if (mensaje.includes("Ficha desactivada correctamente")) {
        Notify.create({
          color: "negative",
          message: mensaje,
          icon: "error",
          timeout: 2500,
        });
      } else {
        Notify.create({
          color: "info",
          message: mensaje,
          icon: "info",
          timeout: 2500,
        });
      }
  
      return r;
    } catch (error) {
      console.log("Error en la solicitud:", error);
      Notify.create({
        color: "negative",
        message: error.response?.data?.errors[0]?.msg || "Error desconocido",
        icon: "error",
        timeout: 2500,
      });
      return error;
    }
  };
  

  const guardarFicha = async (cod, nom) => {
    try {
      let r = await axios.post("http://localhost:5037/api/Fichas/insertar", {
        codigo: cod,
        nombre: nom,
      });
      console.log(r);
      Notify.create({
        color: "positive",
        message: "Registro exitoso",
        icon: "error",
        timeout: 2500,
      });
      return r;
    } catch (error) {
      console.log(error);
      Notify.create({
        color: "negative",
        message: error.response.data.errors[0].msg,
        icon: "error",
        timeout: 2500,
      });

      return error;
    }
  };

  const editarFicha = async (id, cod, nom) => {
    console.log(id);
    try {
      let r = await axios.put(
        `http://localhost:5037/api/Fichas/editar/${id}`,
        { codigo: cod, nombre: nom }
      );
      console.log(r);
      Notify.create({
        color: "positive",
        message: "Edición exitosa",
        icon: "error",
        timeout: 2500,
      });
      return r;
    } catch (error) {
      console.log(error);
      Notify.create({
        color: "negative",
        message: error.response.data.errors[0].msg,
        icon: "error",
        timeout: 2500,
      });
      return error;
    }
  }

  const eliminar = async (id) =>{
    try {
      let r = await axios.delete(`http://localhost:5037/api/Fichas/eliminar/${id}`);
      console.log(r);
      Notify.create({
        color: "positive",
        message: "Eliminación exitosa",
        icon: "error",
        timeout: 2500,
      });
      return r;
    } catch (error) {
      console.log(error);
      Notify.create({
        color: "negative",
        message: error.response.data.errors[0].msg,
        icon: "error",
        timeout: 2500,
      });
      return error;
    }
  }

  return {
    listarFichas,
    token,
    guardarFicha,
    activarDesactivarFichas,
    editarFicha,
    eliminar
  };
},{ persist : true}   );
