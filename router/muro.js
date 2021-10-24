const {Router} = require('express');
const router = Router();

const { miMuro, altaMuro, verMuroSeguir } = require('../controller/muro');
const { valExisteUsuario } = require('../validaciones/validar');

router.post('/consulta', valExisteUsuario, miMuro);

router.put('/alta', valExisteUsuario, altaMuro);

router.post('/muro_seguir', valExisteUsuario, verMuroSeguir);

module.exports = router;