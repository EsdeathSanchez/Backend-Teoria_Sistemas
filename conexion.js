const express = require('express');
const mysql = require('mysql2/promise');

const fs = require('fs');
const yaml = require('js-yaml');

// Configuración de MySQL
const configFile = fs.readFileSync('config.yml', 'utf8');
const config = yaml.load(configFile);


const app = express();
const port = config.server.port;

const db = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  //connectTimeout: 60000, // Tiempo de espera de conexión en milisegundos (60 segundos)
  //waitForConnections: true,
  //connectionLimit: 10,
  //queueLimit: 0,
  //Promise: global.Promise  //habilitar promesas
});


app.get('/obtenerDatosORG', (req, res) => {
    try {
      const sqlConsulta = 'SELECT * FROM USUARIO';
      const resultados = db.query(sqlConsulta);
      logger.info('Datos consultados desde la base de datos de la tabla org:', resultados[0]);
      res.status(200).json({ success: true, data: resultados[0] });
    } catch (error) {
      logger.error('Error al obtener datos de la tabla org:', error);
      res.status(500).json({ success: false, message: 'Error al obtener datos de la tabla' });
    }
  });

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
  