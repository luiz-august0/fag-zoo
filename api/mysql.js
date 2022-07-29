const mysql = require('mysql');

var pool = mysql.createPool({
    "user" : "root",
    "password" : "root123",
    "database" : "fag_zoo_api",
    "host" : "localhost",
    "port" : 3306
})

exports.pool = pool;