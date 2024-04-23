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
});


app.get('/obtenerDatosORG', async (req, res) => {
  try {
      const sqlConsulta = 'SELECT * FROM USUARIO';
      const [resultados, campos] = await db.query(sqlConsulta);
      res.status(200).json({ success: true, data: resultados });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener datos de la tabla' });
  }
});


app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
  