const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 8080;

app.listen(process.env.PORT || 8080);
console.log('Web Server is listening at port '+(process.env.PORT || 8080));
// This is a simple web server that listens on port 8080 or the port specified in the environment variable PORT.
