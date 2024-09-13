import Ficha from "../models/fichas.js";

const fichasHelper = {

  existeFichaID: async (id, req) => {
        const existe = await Ficha.findById(id);
        if (!existe) {
            throw new Error(`No existe el ficha con ID ${id}`);
        }
        req.fichasbd =existe;
    },

    existeNombreFicha: async (nombre) => {
        const existe = await Ficha.findOne({ nombre });
        if (!existe) {
            throw new Error(` No existe la ficha con nombre ${nombre}`);
        }
        req.fichasbd =existe;
    },

    existeCodigo: async (codigo, method = "POST") => {
        try {
            const existe = await Ficha.findOne({ codigo });
            if (existe) {
                throw new Error(`Ya existe ese codigo en la base de datos: ${codigo}`);
            }
        } catch (error) {
            throw new Error(`Error al verificar codigo: ${error.message}`);
        }
    },

    verificarCodigo: async (codigo) => {
        try {
            const existe = await Ficha.findOne({ codigo });
            if (!existe) {
                throw new Error(`El codigo ${codigo} no está registrado`);
            }
            return existe;
        } catch (error) {
            throw new Error(`Error al verificar codigo: ${error.message}`);
        }
    },
};

export { fichasHelper };