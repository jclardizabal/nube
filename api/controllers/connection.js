var mysql = require('mysql');

exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'seov9696',
  database: 'sai',
  connectionLimit: 0,
  pool: false
});
