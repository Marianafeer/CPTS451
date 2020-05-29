const express = require("express");
const app = express();
const PORT = 5000
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //give us access

//routes


//get all the businesses
app.get("/businesses", async(req, res) => {
    try {
        const allBusiness = await pool.query("SELECT * FROM business" );
        res.json(allBusiness.rows);
        
    } catch (err) {
        console.error(err.message)
    }
});

//get one business
app.get("/businesses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const business = await pool.query("SELECT * FROM business WHERE business_id = $1", [id]);
        res.json(business.rows[0])
    } catch (err) { 
        console.error(err.message)
        
    }
})

//get business states
app.get("/states", async (req, res) => {
    try {
        const allBusiness = await pool.query("SELECT DISTINT state FROM business ORDER BY state" );
        res.json(allBusiness.rows);
        
    } catch (err) {
        console.error(err.message)
    }
})
//get business cities
app.get("/cities", async (req, res) => {
    try {
        const allBusiness = await pool.query("SELECT city FROM business" );
        res.json(allBusiness.rows);
        
    } catch (err) {
        console.error(err.message)
    }
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});