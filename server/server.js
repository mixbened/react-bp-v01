require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const PORT = 3050;
const controller = require('./controller');

const app = express();
app.use(bodyParser.json());

// Connection to Database, currently running devmtn postgres Database
massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
})

app.get('/api/users', controller.getData)




app.listen(PORT, () => console.log(`Server is rocking on PORT ${PORT}`))