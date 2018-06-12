require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const PORT = 3050;
const controller = require('./controller');

const app = express();
app.use(bodyParser.json());

// Connection to Database, currently running devmtn postgres Database
massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }));

app.get('/api/users/', controller.getData)
app.post('/api/users/login/', controller.login)
app.post('/api/users/register/', controller.register)
app.get('/api/users/session/', controller.session)
app.get('/api/users/logout/', controller.logout)

app.listen(PORT, () => console.log(`Server is rocking on PORT ${PORT}`))