const express = require('express');
const conn = require('./DBConnection');

const app = express();

app.use(express.static('static'));

app.get('/addGuest', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Availability values ('${req.query.name}','${req.query.one.checked}','${req.query.two.checked}',
    '${req.query.three.checked}', '${req.query.four.checked}', '${req.query.five.checked}', '${req.query.six.checked}', '${req.query.seven.checked}',
    '${req.query.eight.checked}', '${req.query.nine.checked}', '${req.query.ten.checked}',)`
            ,(err,rows,fields) => {
                res.redirect('/guest-page.html');        
            } );

    conn.end();
})

app.get('/displayAvailability', (req,res) => {
    let conn = newConnection();
    conn.connect();
    let available;
    conn.query(`select * from Availability`
            ,(err,rows,fields) => {
                if (err)
                response.send('ERROR: ' +err)
                else
                {
                    available = rows;
        
                    let content ='';
                    for (a of available)
                    {
                        content += '<div>';
                        content += a.Name + ":" + a.Available1 + a.Available2 + a.Available3 + a.Available4 + a.Available5 + a.Available6 + a.Available7 + a.Available8 + a.Available9 + a.Available10
                        content += '</div>'
                        content += '\n';
                    }
        
                    response.send(content);
                }
            });

    conn.end();
})