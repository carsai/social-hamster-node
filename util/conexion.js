const sqlite3 = require('sqlite3').verbose();

const tablaUsuario = `CREATE TABLE usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre text UNIQUE
    )`;

const tablaMuro = `CREATE TABLE muro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre text,
    mensaje text,
    fecha integer
    )`;

const tablaSiguiendo = `CREATE TABLE siguiendo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre text,
    nombre_seguido text
    )`;

const sqlInsertUsuario = 'INSERT INTO usuario(nombre) VALUES(?)';

const sqlSelectUsuario = 'SELECT nombre FROM usuario WHERE nombre = ?';

const sqlInsertMuro = 'INSERT INTO muro(nombre, mensaje, fecha) VALUES(?, ?, ?)';

const sqlSelectMuro = 'SELECT id, nombre, mensaje, fecha FROM muro WHERE nombre = ?';

const sqlConsultaMuroSeguir = 'SELECT m.id, s.nombre_seguido nombre, m.mensaje, m.fecha FROM muro m, siguiendo s WHERE m.nombre = s.nombre_seguido AND s.nombre = ? ORDER BY m.fecha DESC';

const sqlInsertSeguir = 'INSERT INTO siguiendo(nombre, nombre_seguido) VALUES(?, ?)';

const sqlSelectSeguir = 'SELECT id, nombre_seguido nombre FROM siguiendo WHERE nombre = ?';

const sqlEliminarSeguir = 'DELETE FROM siguiendo WHERE nombre = ? AND nombre_seguido = ?';

const sqlExisteSeguir = 'SELECT COUNT(*) cantidad FROM siguiendo WHERE nombre = ? AND nombre_seguido = ?';


/**
 * 
 * @returns {Promise<import('sqlite3').Database>}
 */
const conectar = () => new Promise((resolve, reject) => {
    const db = new sqlite3.Database(process.env.DB, error => {
        if (error) {
            reject(error.message);
        } else {
            resolve(db);
        }
    });
});

/**
 * 
 * @param {String} sql 
 * @returns {Promise<String>}
 */
const ejecutarSql = sql => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.run(sql, (error) => {
        if (error && error.errno !== 1) {
            console.log(error);
            reject(error.message);
        } else {
            db.close(error => (error) ? reject(error.message) : resolve('ok'));            
        }
    });
});

const unResultadoSql = (sql, parametros) => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.get(sql, parametros, (error, row) => {
        if(error) {
            reject(error);
        } else {
            resolve(row);
        }
    })
});

const iniciarTablas = async () => {
    try {
       await ejecutarSql(tablaUsuario);
       await ejecutarSql(tablaMuro);
       await ejecutarSql(tablaSiguiendo); 
       console.log('tablas iniciadas');
    } catch (error) {
        console.error(`Error: ${error}`);
    }
    
}

const altaUsuarioDB = usuario => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.run(sqlInsertUsuario, [usuario], error => {
        if(error) {
            reject(error);
        } else {
            resolve('usuario insertado');
        }
    });
});

const altaMuroDB = (usuario, muro) => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.run(sqlInsertMuro, [usuario, muro, Date.now()], error => {
        if(error) {
            reject(error);
        } else {
            resolve('muro insertado');
        }
    });
});

const recuperarMuroDB = usuario => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.all(sqlSelectMuro, [usuario], (error, rows) => {
        if (error) {
            reject(error);
        } else {
            resolve(rows);
        }
    })
});

const altaSeguirDB = (usuario, usuarioSeguir) => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.run(sqlInsertSeguir, [usuario, usuarioSeguir], error => {
        if(error) {
            reject(error);
        } else {
            resolve('seguimiento insertado');
        }
    });
});

const recuperarSeguirDB = usuario => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.all(sqlSelectSeguir, [usuario], (error, rows) => {
        if (error) {
            reject(error);
        } else {
            resolve(rows);
        }
    })
});

const eliminarSeguirDB = (usuario, usuarioSeguir) => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.run(sqlEliminarSeguir, [usuario, usuarioSeguir], error => {
        if (error) {
            reject(error);
        } else {
            resolve(`Se ha eliminado el usuario ${usuarioSeguir} que estaba siguiendo ${usuario}`);
        }
    });
});

const existeUsuarioDB = usuario => new Promise(async (resolve, reject) => {
    try {
       const resultado = await unResultadoSql(sqlSelectUsuario, [usuario]);

        if(resultado?.nombre) {
            resolve(true);
        } else {
            resolve(false);
        } 
    } catch (error) {
        reject(error);
    }
    
});

const recuperarMuroSeguirDB = usuario => new Promise(async (resolve, reject) => {
    const db = await conectar();
    db.all(sqlConsultaMuroSeguir, [usuario], (error, rows) => {
        if (error) {
            reject(error);
        } else {
            resolve(rows);
        }
    })
});

const existeSeguirDB = (usuario, usuarioSeguir) => new Promise(async (resolve, reject) => {
    try {
        const {cantidad} = await unResultadoSql(sqlExisteSeguir, [usuario, usuarioSeguir]);
        resolve(cantidad !== 0);
    } catch (error) {
        reject(error);
    }
    
});
    
module.exports = {
    iniciarTablas, 
    altaUsuarioDB,
    existeUsuarioDB, 
    altaMuroDB, 
    recuperarMuroDB,
    altaSeguirDB,
    recuperarSeguirDB,
    eliminarSeguirDB,
    recuperarMuroSeguirDB,
    existeSeguirDB
};