const {Router} = require('express');
const router = Router();

const { miUsuario, altaUsuario } = require('../controller/usuario');

router.post('/mi_usuario', miUsuario);

router.post('/alta', altaUsuario);

module.exports = router;