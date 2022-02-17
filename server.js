const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const express = require(`express`);

const PORT = process.env.PORT || 3001;
//this one will instantiate the server
const app = express();

//this middleware will connect our index pages to the css and js styling pages
app.use(express.static('public'));
//parse the incoming user data into something that our app understands
app.use(express.urlencoded({ extended: true }));
//parse the incoming JSON data
app.use(express.json());
//this tell s the server to route a client from <outhost>/api to the router in apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const { animals } = require('./data/animals');

app.listen(PORT, () => {
    console.log('API server now on port ${PORT}!');
});

