var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "raghav",
  database: "adhiyagya",
  socketPath : '/var/run/mysqld/mysqld.sock'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;