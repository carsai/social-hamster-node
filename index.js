const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {iniciarTablas} = require('./util/conexion');

iniciarTablas().then();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/muro', require('./router/muro'));
app.use('/api/usuario', require('./router/usuario'));
app.use('/api/seguir', require('./router/seguir'));

app.listen(process.env.PUERTO, () => console.log(`Iniciando en el servidor ${process.env.PUERTO}`));