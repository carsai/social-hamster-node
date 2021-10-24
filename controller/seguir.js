const { recuperarSeguirDB, altaSeguirDB, eliminarSeguirDB } = require('../util/conexion');

const consultaSeguir = async (req, res) => {
   const {usuario} = req.body;
   try {
      const siguiendo = await recuperarSeguirDB(usuario);
      return res.json({ ok: true, siguiendo });
   } catch (error) {
      return res.status(500).json({ok: false, error: error.message});
   }   
}

const altaSeguir = async (req, res) => {
   const {usuario, usuSeguir} = req.body;

   try {
      await altaSeguirDB(usuario, usuSeguir);
      return res.json({ok: true});
   } catch (error) {
      return res.status(500).json({ok: false, error: error.message});
   }
}

const eliminarSeguir = async (req, res) => {
   const {usuario, usuSeguir} = req.body;

   try {
      await eliminarSeguirDB(usuario, usuSeguir);
      return res.json({ok: true});
   } catch (error) {
      return res.status(500).json({ok: false, error: error.message});
   }
}

module.exports = {
   consultaSeguir,
   altaSeguir,
   eliminarSeguir
}