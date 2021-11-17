const express = require('express');
const cookieParser = require('cookie-parser');
const newConnection = require('./DBConnection');

const app = express();

app.use(cookieParser("secret"));

// serve static contents
app.use(express.static('static'));

// dynamic handling
// Enable access to the body of the request
app.use(express.urlencoded({
    // Extend access to body
    extended: true
}))

// If username/password combo is that of an admin, then they can proceed
// otherwise, access will be denied
app.post('/login', (request, response) => {
    let conn = newConnection();
    conn.connect();
    let username = request.body.usr;
    let password = request.body.pwd;
    let message = "Access denied, please return to home page.";
    if(username == 'admin' && password == '123'){
        message = `<a href='/createDB.html'>Please Click here to Proceed</a>`;
        // Writing cookies
        response.cookie("usr",username, {expires: new Date(2050,0,1)});
        response.cookie("pwd",password, {signed : true}, {expires: new Date(2050,0,1)});
    }
    response.send(message);
    conn.end();
})

// Will remember username/password for next time by using cookies
app.get('/login-form', (request,response) => {
    let conn = newConnection();
    conn.connect();
    let username, password;
    username = request.cookies.usr || '';
    password = request.signedCookies.pwd || '';
    let content = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action='/login-form' method='post'>
            <label for="usr">Username:</label><br>
            <input type="text" id="usr" name="usr" value="${username}'><br>
            <label for="pwd">Password:</label><br>
            <input type="text" id="pwd" name="pwd" value="${password}'><br><br>
            <input type="submit" value="Submit">
        </form>
    </body>
    </html>`;

    response.send(content);
    conn.end();
})

// Allow admin to create/reset tables in DB
app.get('/create-reset-tables', (req,res) => {
    let conn = newConnection();
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
                Time10 varchar(10)
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
                Available1 varchar(25),
                Available2 varchar(25),
                Available3 varchar(25),
                Available4 varchar(25),
                Available5 varchar(25),
                Available6 varchar(25),
                Available7 varchar(25),
                Available8 varchar(25),
                Available9 varchar(25),
                Available10 varchar(25)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                    else 
                            console.log('Availability Table Created');
            });

    conn.end();
})

// Will update/set the time [can only be performed by admin]
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

// Will display the list of times set/updated by the admin
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

// Will add a new guest with their name/availability
app.get('/addGuest', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Availability values ('${req.query.name}','${String.valueOf(req.query.one)}','${String.valueOf(req.query.two)}',
    '${String.valueOf(req.query.three)}', '${String.valueOf(req.query.four)}', '${String.valueOf(req.query.five)}', '${String.valueOf(req.query.six)}', '${String.valueOf(req.query.seven)}',
    '${String.valueOf(req.query.eight)}', '${String.valueOf(req.query.nine)}', '${String.valueOf(req.query.ten)}',)`
            ,(err,rows,fields) => {
                res.redirect('/guest-page.html');        
            } );

    conn.end();
})

// Will display the availability of guests in a list
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

app.listen(80);