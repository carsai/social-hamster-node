const { altaUsuarioDB, existeUsuarioDB } = require('../util/conexion');

const miUsuario = async (req, res) => {
    const {usuario} = req.body;
    try {
        if (await existeUsuarioDB(usuario)) {
            return res.json({ok: true});
        } else {
            return res.status(404).json({ok: false});
        }
    } catch (error) {
       return res.status(500).json({ok: false}); 
    }
   
}

const altaUsuario = async (req, res) => {
    const {usuario} = req.body;
    try {
        if (await existeUsuarioDB(usuario)) {
            throw new Error('El usuario ya existe');
        }
        await altaUsuarioDB(usuario);
    } catch (error) {
        return res.json({ok: false, error: error.message});    
    }    
    return res.json({ok: true, usuario});
 }

module.exports = {
    miUsuario,
    altaUsuario
}