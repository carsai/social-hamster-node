const { existeUsuarioDB, existeSeguirDB } = require('../util/conexion');

const valExisteUsuario = async (req, res, next) => {
    const {usuario} = req.body;
    if(await existeUsuarioDB(usuario)) {
        return next();
    } else {
        return res.status(404).json({ok: false, error: 'Usuario no encontrado'});
    }
}

const valUsuarioSeguir = async (req, res, next) => {
    const {usuario, usuSeguir} = req.body;

    if(!await existeUsuarioDB(usuSeguir)) {
        return res.status(404).json({ok: false, error: 'Usuario no encontrado'});
    }

    if(await existeSeguirDB(usuario, usuSeguir)) {
        return res.status(404).json({ok: false, error: 'Ya lo estas siguiendo'});
    }

    return next();
}

module.exports = {
    valExisteUsuario,
    valUsuarioSeguir
}