const express = require('express');
const conn = require('./DBConnection');

const app = express();

app.use(express.static('static'));

app.get('/updateAvailability', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Times values ('${req.query.one}','${req.query.two}',
    '${req.query.three}', '${req.query.four}', '${req.query.five}', '${req.query.six}', '${req.query.seven}',
    '${req.query.eight}', '${req.query.nine}', '${req.query.ten}',)`
            ,(err,rows,fields) => {
                res.redirect('/update-availability.html');        
            } );

    conn.end();
})