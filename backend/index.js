const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3030;
const db = require('./queries')

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

app.get('/state', db.getAllStates)
app.get('/state/:state', db.getState)
app.get('/city/:state', db.getCitiesInState)
app.get('/zipcode/:city', db.getZipcodeInCity)
app.get('/category/:zipcode', db.getCategoriesInZipcode)

//app.get('/category', db.getAllCategories)


//app.get("/getcategories/", db.getCategories)

app.get('/businesses/', db.getAllBusinesses)
//app.get('/businesses/:category', db.getBusinessesInCategory)

app.get('/businesses/:category', db.getBusinessesInCategory)

app.get('/businesses/:city/:name', db.getBusinessInfo)
app.get('/count/state/:state', db.getBusinessSC)
app.get('/count/city/:city', db.getBusinessCC)
app.get('/count/zipcode/:zipcode', db.getBusinessZCC)
app.get('/count/category/:category', db.getBusinessCAC)
app.get('/business/:zipcode/:categories', db.getBusinessesfromCategories)

//user Information
app.get('/name', db.getAllNames)
app.get('/name/:name', db.getName)
app.get('/userid/:name', db.getIDFromName)
app.get('/userinfo/:userid', db.getUserinfoInID)


