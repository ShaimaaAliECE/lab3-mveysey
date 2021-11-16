const express = require('express');
const conn = require('./DBConnection');

const app = express();

app.use(express.static('static'));

app.get('/updateAvailability', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`replace into Times set 
    Available1='${req.query.one}',
    Available2='${req.query.two}',
    Available3='${req.query.three}', 
    Available4='${req.query.four}', 
    Available5='${req.query.five}', 
    Available6='${req.query.six}', 
    Available7='${req.query.seven}',
    Available8='${req.query.eight}', 
    Available9='${req.query.nine}', 
    Available10='${req.query.ten}',`
            ,(err,rows,fields) => {
                res.redirect('/update-availability.html');        
            });

    conn.end();
})

app.get('/displayTimes', (req,res) => {
    let conn = newConnection();
    conn.connect();
    let times;
    conn.query(`select * from Times`
            ,(err,rows,fields) => {
                if (err)
                response.send('ERROR: ' +err)
                else
                {
                    times = rows;
        
                    let content ='';
                    for (t of times)
                    {
                        content += '<div>';
                        content += t.Time1 + t.Time2 + t.Time3 + t.Time4 + t.Time5 + t.Time6 + t.Time7 + t.Time8 + t.Time9 + t.Time10
                        content += '</div>'
                        content += '\n';
                    }
        
                    response.send(content);
                }
            });

    conn.end();
})