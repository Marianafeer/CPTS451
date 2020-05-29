const Pool = require("pg").Pool;

//conecting the database
const pool = new Pool({
    user: "postgres",
    password: "Col39709116",
    host: "localhost",
    port: 5432,
    database: "milestone1db"
});


module.exports =  pool;