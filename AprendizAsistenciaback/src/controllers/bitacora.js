import mongoose from 'mongoose';
import Bitacora from '../models/bitacora.js';
import Aprendices from '../models/aprendices.js';
import ficha from '../models/fichas.js';

const httpBitacora = {
    // Listar todas las entradas de bitácora

    crearBitacora : async (req, res) => {
        try {
            const { IdAprendis, fecha } = req.body;
    
            const nuevaBitacora = new Bitacora({
                IdAprendis,
                fecha: new Date(fecha) // Convertir la fecha a un objeto de tipo Date
            });
    
            await nuevaBitacora.save();
            res.status(201).json(nuevaBitacora);
        } catch (error) {
            console.error('Error al insertar la bitácora:', error);
            res.status(500).json({ error: 'Error al insertar la bitácora' });
        }
    },
    //Cambiar estado
    actualizarEstado: async (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;

        const estadosPermitidos = ['pendiente', 'asistió', 'faltó', 'excusa'];
        if (!estadosPermitidos.includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido' });
        }

        try {
            const bitacoraActualizada = await Bitacora.findByIdAndUpdate(
                id,
                { estado },
                { new: true } 
            );

            if (!bitacoraActualizada) {
                return res.status(404).json({ error: 'Bitácora no encontrada' });
            }

            console.log('Bitácora actualizada:', bitacoraActualizada);
            res.json(bitacoraActualizada);
        } catch (error) {
            console.error('Error al actualizar el estado de la bitácora:', error);
            res.status(500).json({ error: 'Error al actualizar el estado de la bitácora' });
        }
    },
    
    // Listar todas las entradas de bitácora en un rango de fechas determinado
    listarBitacoraPorFecha : async (req, res) => {
        try {
            const { inicio, fin } = req.params;
            const inicioDate = new Date(inicio);
            const finDate = new Date(fin);
    
            // Verificar la validez de las fechas
            if (isNaN(inicioDate.getTime()) || isNaN(finDate.getTime())) {
                return res.status(400).json({ error: 'Fechas inválidas' });
            }
    
            const bitacoras = await Bitacora.find({ fecha: { $gte: inicioDate, $lte: finDate } }).populate({path:'IdAprendis',populate:{path:'IdFicha'}})

            console.log('Lista de entradas de bitácora:', bitacoras);
            res.json(bitacoras);
        } catch (error) {
            console.error('Error al listar las entradas de bitácora:', error);
            res.status(500).json({ error: 'Error al listar las entradas de bitácora' });
        }
    },
    // Listar entradas de bitácora por ID de Aprendis en un rango de fechas determinado
    listarBitacoraPorAprendis: async (req, res) => {
        const { IdAprendis } = req.params;
        const { fechaInicio, fechaFin } = req.params; 
        try {
            const fechaInicioDate = new Date(fechaInicio);
            const fechaFinDate = new Date(fechaFin);
    
            // Verificar la validez de las fechas
            if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
                return res.status(400).json({ error: 'Fechas inválidas' });
            }
    
            const bitacoras = await Bitacora.find({ 
                IdAprendis,
                fecha: { $gte: fechaInicioDate, $lte: fechaFinDate }
            }).sort({ fecha: -1 });
    
            console.log(`Lista de entradas de bitácora para el aprendiz ${IdAprendis} entre ${fechaInicio} y ${fechaFin}:`, bitacoras);
            res.json(bitacoras);
        } catch (error) {
            console.error(`Error al listar las entradas de bitácora para el aprendiz ${IdAprendis} entre ${fechaInicio} y ${fechaFin}:`, error);
            res.status(500).json({ error: `Error al listar las entradas de bitácora para el aprendiz ${IdAprendis} entre ${fechaInicio} y ${fechaFin}` });
        }
    },

    
    // Listar entradas de bitácora por IDFicha (en un rango de fechas determinado)
    /* obtenerBitacorasPorIdFicha : async (req, res) => {
        const { idFicha } = req.params;
        const { fechaInicio, fechaFin } = req.query;
    
        if (!fechaInicio || isNaN(Date.parse(fechaInicio)) || !fechaFin || isNaN(Date.parse(fechaFin))) {
            return res.status(400).json({ error: 'Fechas de inicio o fin no son válidas' });
        }
    
        try {
            const result = await Bitacora.aggregate([
                {
                    $lookup: {
                        from: 'Aprendices',
                        localField: 'IdAprendis',
                        foreignField: '_id',
                        as: 'aprendiz'
                    }
                },
                { $unwind: '$aprendiz' },
                {
                    $match: {
                        'aprendiz.IdFicha': new mongoose.Types.ObjectId(idFicha),
                        fecha: {
                            $gte: new Date(fechaInicio), // Filtra por fecha de inicio
                            $lte: new Date(fechaFin)     // Filtra por fecha de fin
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        IdAprendis: 1,
                        fecha: 1,
                        aprendiz: {
                            IdFicha: 1,
                            cc: 1,
                            nombre: 1
                        }
                    }
                }
            ]);
    
            console.log(Lista de entradas de bitácora para la ficha ${idFicha} en el rango de fechas ${fechaInicio} a ${fechaFin}:, result);
            res.json(result);
        } catch (error) {
            console.error('Error al listar Bitacora:', error);
            res.status(500).json({ error: 'Error al listar Bitacora' });
        }
    } */

        obtenerBitacorasPorIdFicha: async (req, res) => {
            const { IdFicha } = req.params;
            try {
                let array = [];
                const bitacoras = await Bitacora.find()
                .populate({
                    path: 'IdAprendis',
                    populate: { path: 'IdFicha' }
                })
                .exec();
    
                for (let i = 0; i < bitacoras.length; i++) {
                    const bitacora = bitacoras[i];
                    const estudiante = {
                        _id: bitacora?.IdAprendis?.IdFicha,
                        name: {
                            first: "Future",
                            last: "Studio"
                        }
                    };
                    const isEqual = estudiante._id.equals(IdFicha);
    
                    if (bitacora?.IdAprendis?.IdFicha === IdFicha || isEqual) {
                        array.push(bitacora);
                    }
                }
    
                console.log(`Lista de entradas de bitácora para la ficha ${IdFicha}:, array`);
                res.json(array);
            } catch (error) {
                console.error(`Error al listar las entradas de bitácora para la ficha ${IdFicha}:, error`);
                res.status(500).json({ error: `Error al listar las entradas de bitácora para la ficha ${IdFicha}`});
            }
        }

}
    

export default httpBitacora;