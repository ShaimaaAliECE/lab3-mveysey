const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser("secret"));

// serve static contents
app.use(express.static('static'));

// dynamic handling

// Get users input on login page

// Enable access to the body of the request
app.use(express.urlencoded({
    // Extend access to body
    extended: true
}))

// If username/password combo is that of an admin, then they can proceed
// otherwise, access will be denied
app.post('/login', (request, response) => {
    let username = request.body.usr;
    let password = request.body.pwd;
    let message = "Access denied, please return to home page.";
    if(username == 'admin' && password == '123'){
        message = 'Welcome';
        // Writing cookies
        response.cookie("usr",username, {expires: new Date(2050,0,1)});
        response.cookie("pwd",password, {signed : true}, {expires: new Date(2050,0,1)});
    }
    response.send(message);
})

app.get('/login-form', (request,response) => {
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
})

app.listen(80);