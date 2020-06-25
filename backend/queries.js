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
    const zipcode = request.params.zipcode;
    pool.query('SELECT DISTINCT category  FROM business JOIN category ON businessid = categoryid WHERE zipcode = $1', [zipcode], (error, results) => {
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

const getBusinessesInCategory = (request, response) => {
    const category = request.params.category;
    pool.query('SELECT DISTINCT name FROM business JOIN category ON businessid = categoryid WHERE category = $1 ORDER BY name', [category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

/* we need to get business depending on the category selected 
const getBusinessesInCategory = (request, response) => {
    const category = request.params.category;
    pool.query('SELECT name  FROM business JOIN category ON businessid = categoryid', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}*/

const getBusinessInfo = (request, response) => {
    const name = request.params.name;
    const category = request.params.category;
    pool.query('SELECT DISTINCT * FROM business JOIN ON businessid = categoryid WHERE name = $1 AND category = $2 ORDER BY name', [name, category], (error, results) => {
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
    const category = request.params.category;
    pool.query('SELECT COUNT (DISTINCT name) FROM business JOIN category ON businessid = categoryid WHERE category = $1', [category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const getBusinessesfromCategories = (request, response) => {
            const categoryURL = request.params.categories;
            const categories = categoryURL.split(' ');
            const zipcode = request.params.zipcode;
            console.log("categories =" +  categories);
            let sqlQuery = 'SELECT * FROM business,(';

            for (i = 0; i < categories.length; i++) {
                            if (i > 0){
                                                sqlQuery += ' INTERSECT ';
                                            }       
                            sqlQuery += 'SELECT categoryid FROM category WHERE category=' + "'" + categories[i] + "'";
                        }
            sqlQuery += ') as businessCategories WHERE categoryid=businessid';
            if (zipcode){
                            sqlQuery += " AND zipcode=" + zipcode;
                        }
            sqlQuery += ';';
            console.log(sqlQuery);
            pool.query(sqlQuery, (error, results) => {
                            if (error) {
                                                throw error
                                            }
                            response.status(200).json(results.rows)
                        });
}


//USER INFORMATION
const getAllNames = (request, response) => {
    pool.query('SELECT DISTINCT name FROM usertable ORDER BY name', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getName = (request, response) => {
    const name = request.params.name;
    pool.query('SELECT DISTINCT name FROM usertable WHERE name = $1 ', [name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getIDFromName = (request, response) => {
    const name = request.params.name;
    pool.query('SELECT DISTINCT userid FROM usertable WHERE name = $1 ORDER BY userid', [name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getUserinfoInID = (request, response) => {
    const userid = request.params.userid;
    pool.query('SELECT * FROM usertable WHERE userid = $1 ORDER BY name', [userid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const getAllUserInfo = (request, response) => {
    pool.query('SELECT * FROM usertable ORDER BY name', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// get FavoriteBusinessInfo using userid 
const getFavoriteBusinesses = (request, response) => {
    const userid = request.params.userID;
    pool.query('SELECT * FROM favorite, business WHERE favorite.userid = $1 and favorite.businessid = business.businessid', [userid], (error, results) => {
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

    //getAllCategories,

    //getCategories,
    getAllBusinesses,
    getBusinessesInCategory,
    //getBusinessesInCategory,
    getBusinessInfo,
    getBusinessSC,
    getBusinessCC,
    getBusinessZCC,
    getBusinessCAC,
    getBusinessesfromCategories, 


    //USER INFORMATION
    getName,
    getAllNames,
    getIDFromName,
    getUserinfoInID,
    getAllUserInfo,
    // Favorite Business Info
    getFavoriteBusinesses,}
