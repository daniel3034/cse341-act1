const express = require('express');
const app = express();
const mongodb = require('./routes/contacts');

app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

const port = 8080;

app.listen(process.env.PORT || 8080);
console.log('Web Server is listening at port '+(process.env.PORT || 8080));
// This is a simple web server that listens on port 8080 or the port specified in the environment variable PORT.

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`);});
    }
});
// This code initializes a MongoDB connection and starts the web server.
// If there is an error connecting to the database, it logs the error. Otherwise, it starts the server.


// Router for contacts
const contactsRoutes = require('./routes/contacts').contacts;
app.use('/contacts', contactsRoutes);