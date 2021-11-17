const mysql = require('mysql');

function newConnection(){
    let conn = mysql.createConnection({
        host:'34.130.165.189',
        user:'doodle',
        password:'12sql34',
        database:'doodleDB'
    });

    return conn;
}

module.exports = newConnection;