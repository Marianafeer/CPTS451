const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'yelpDB',
    port: 5432,
})

const getState = (request, response) => {
    const state = request.params.state;
    pool.query('SELECT DISTINCT state FROM business WHERE state = $1 ', [state], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getAllStates = (request, response) => {
    pool.query('SELECT DISTINCT state FROM business ORDER BY state', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCitiesInState = (request, response) => {
    const state = request.params.state;
    pool.query('SELECT DISTINCT city FROM business WHERE state = $1 ORDER BY city', [state], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getZipcodeInCity = (request, response) => {
    const city = request.params.city;
    pool.query('SELECT DISTINCT zipcode FROM business WHERE city = $1 ORDER BY zipcode', [city], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getCategoriesInZipcode = (request, response) => {
    const zipcode = request.params.city;
    pool.query('SELECT DISTINCT category FROM business NATURAL JOIN category WHERE  zipcode = $1 ORDER BY category', [zipcode], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}



const getAllCategories = (request, response) => {
    pool.query('SELECT DISTINCT category FROM category ORDER BY category', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getBusinessesInCategory= (request, response) => {
    const category = request.params.city;
    const state = request.params.city;
    const city = request.params.city;
    const zipcode = request.params.city;
    pool.query('SELECT DISTINCT name FROM business NATURAL JOIN category WHERE zipcode = $1, state= $2, city = $3  ORDER BY name', [zipcode, state, city], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}



const getAllBusinesses = (request, response) => {
    pool.query('SELECT * FROM business ORDER BY name', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getBusinessesInZipcode = (request, response) => {
    const zipcode = request.params.city;
    pool.query('SELECT DISTINCT name FROM business WHERE zipcode = $1 ORDER BY name', [zipcode], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}



const getBusinessInfo = (request, response) => {
    const name = request.params.name;
    const category = request.params.zipcode;
    pool.query('SELECT DISTINCT * FROM business WHERE name = $1 AND category = $2 ORDER BY name', [name, category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getBusinessSC = (request, response) => {
    const state = request.params.state;

    pool.query('SELECT COUNT (DISTINCT name) FROM business WHERE state = $1', [state],  (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getBusinessCC = (request, response) => {
    const city = request.params.city;
    pool.query('SELECT COUNT (DISTINCT name) FROM business WHERE city = $1', [city], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getBusinessZCC = (request, response) => {
    const zipcode = request.params.zipcode;
    pool.query('SELECT COUNT (DISTINCT name) FROM business WHERE zipcode = $1', [zipcode], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getBusinessCAC = (request, response) => {
    const category = request.params.state;

    pool.query('SELECT COUNT (DISTINCT category) FROM category WHERE category = $1', [category],  (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


module.exports = {
    getState,
    getAllStates,
    getCitiesInState,
    getZipcodeInCity,
    getCategoriesInZipcode,
    getAllCategories,
    getAllBusinesses,
    getBusinessesInZipcode,
    getBusinessInfo,
    getBusinessSC,
    getBusinessCC,
    getBusinessZCC,
    getBusinessCAC,
}