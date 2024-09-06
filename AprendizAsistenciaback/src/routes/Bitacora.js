import express from 'express';
import { check } from 'express-validator';
import httpBitacora from '../controllers/bitacora.js';

import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { aprendicesHelper } from '../helpers/Aprendices.js';
import { bitacoraHelper } from '../helpers/Bitacora.js';
import { fichasHelper } from '../helpers/fichas.js';
const router = express.Router();

router.post('/insertar',
    [
        /* validarJWT, */
        check('IdAprendis', 'No es un ID válido').isMongoId(),
        /* check('IdAprendis').custom(aprendicesHelper.existeAprendizID), */
        check('fecha', 'La fecha es obligatorio').not().isEmpty(),
        validarCampos
    ],
    httpBitacora.crearBitacora);

    router.put('/estado/:id',
        [
            /* validarJWT, */
            check('id', 'No es un ID válido').isMongoId(),
            check('id').custom(bitacoraHelper.existeBitacoraID),
            validarCampos
        ],
        httpBitacora.actualizarEstado);

router.get('/bitacora/:inicio/:fin',
    [
        /* validarJWT */
    ],
    httpBitacora.listarBitacoraPorFecha);
    
// intervalo de fechas y fecha especifica listar por id aprendiz....
router.get('/listarBitacora/:IdAprendis/:fechaInicio/:fechaFin',
    [
        /* validarJWT, */
        check('IdAprendis', 'No es un ID válido').isMongoId(),
        check('IdAprendis').custom(aprendicesHelper.existeAprendizID),
        validarCampos
    ],
    httpBitacora.listarBitacoraPorAprendis);

// intervalo de fechas y fecha especifica listar id ficha....

router.get('/ListarbitacoraIdFicha/:IdFicha/:fechaInicio/:fechaFin',
    [
        /* validarJWT, */
        check('IdFicha', 'El id invalido').isMongoId(),
        check('IdFicha').custom(fichasHelper.existeFichaID),
        validarCampos
    ],
    httpBitacora.obtenerBitacorasPorIdFicha);


export default router;