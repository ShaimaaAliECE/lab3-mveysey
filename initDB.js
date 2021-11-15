const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'34.130.165.189',
    username:'root',
    password:'12sql34',
    database:'doodleDB',
});

conn.connect();

conn.query(`CREATE TABLE Test
            (
                Name varchar(25),
                Available1 BIT,
                Available2 BIT,
                Available3 BIT,
                Available4 BIT,
                Available5 BIT,
                Available6 BIT,
                Available7 BIT,
                Available8 BIT,
                Available9 BIT,
                Available10 BIT
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                
                else 
                    console.log('Table Created');
                
            });

conn.end();
            