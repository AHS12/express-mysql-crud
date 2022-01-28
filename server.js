const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT || 5000;
const corsOptions = {
    origin: `http://localhost:${port}`,
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// use public directory to serve static files
app.use(express.static('public'));

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API.' });
});

// require other route here.
//user routes
require('./routes/users.route')(app);

// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
