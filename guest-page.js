const express = require('express');
const conn = require('./DBConnection');

const app = express();

app.use(express.static('static'));

app.get('/addGuest', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Availability values ('${req.query.name}','${req.query.one}','${req.query.two}',
    '${req.query.three}', '${req.query.four}', '${req.query.five}', '${req.query.six}', '${req.query.seven}',
    '${req.query.eight}', '${req.query.nine}', '${req.query.ten}',)`
            ,(err,rows,fields) => {
                res.redirect('/guest-page.html');        
            } );

    conn.end();
})