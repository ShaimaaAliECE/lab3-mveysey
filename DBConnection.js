const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'34.130.165.189',
    user:'doodle',
    password:'12sql34',
    database:'doodleDB'
});

module.exports = conn;