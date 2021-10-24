const { recuperarMuroDB, altaMuroDB, recuperarMuroSeguirDB } = require('../util/conexion');

const miMuro = async (req, res) => {
    const { usuario } = req.body;
    let muro = [];
    try {
        muro = await recuperarMuroDB(usuario);
        return res.json({ ok: true, muro });
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
}

const altaMuro = async (req, res) => {
    const { usuario, mensaje } = req.body;
    let muro = [];
    try {
        muro = await altaMuroDB(usuario, mensaje);
        return res.json({ ok: true });
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
}

const verMuroSeguir = async (req, res) => {
    const { usuario } = req.body;
    let muro = [];
    try {
        muro = await recuperarMuroSeguirDB(usuario);
        return res.json({ok: true, muro});
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
}

module.exports = {
    miMuro,
    altaMuro,
    verMuroSeguir
}