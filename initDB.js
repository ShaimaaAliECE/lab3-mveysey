const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'34.130.165.189',
    user:'doodle',
    password:'12sql34',
    database:'doodleDB'
});

conn.connect();

//Drop any previously existing tables called 'Times'
conn.query(`Drop Table Times`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Times Table Dropped');
                }
            )

//Drop any previously existing tables called 'Availability'
conn.query(`Drop Table Availability`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Availability Table Dropped');
                }
            )

// Create a table for the time values
conn.query(`CREATE TABLE Times
            (
                Time1 varchar(10),
                Time2 varchar(10),
                Time3 varchar(10),
                Time4 varchar(10),
                Time5 varchar(10),
                Time6 varchar(10),
                Time7 varchar(10),
                Time8 varchar(10),
                Time9 varchar(10),
                Time10 varchar(10),
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                
                else 
                    console.log('Times Table Created');
            });

// Initialize Availability Table
conn.query(`CREATE TABLE Availability
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
                    console.log('Availability Table Created');
            });

conn.end();
            