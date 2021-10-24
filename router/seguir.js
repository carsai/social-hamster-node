const {Router} = require('express');
const router = Router();

const { consultaSeguir, altaSeguir, eliminarSeguir } = require('../controller/seguir');
const { valExisteUsuario, valUsuarioSeguir } = require('../validaciones/validar');

router.post('/consulta', valExisteUsuario, consultaSeguir);

router.put('/alta', valExisteUsuario, valUsuarioSeguir, altaSeguir);

router.delete('/eliminar', valExisteUsuario, eliminarSeguir);

module.exports = router;