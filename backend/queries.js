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

let getBusinessInfo = (request, response) => {
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


const getUserFriends = (request, response) => {
    const userid = request.params.userID;
    pool.query('SELECT * from friend, usertable where usertable.userid = friend.friendid and friend.personid = $1', [userid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const getFriendTips = (request, response) => {
    const userid = request.params.userID;
    pool.query('select * from usertable, review, friend where personid=$1 and friend.friendid = usertable.userid and review.userid = friend.friendid;', [userid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

getBusinessInfo = (request, response) => {
    const businessid = request.params.businessID;
    pool.query('select * from business where businessid=$1 order by name;', [businessid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}
 
// Need to make use of order by
const getBusinessInfoOrder = (request, response) => {
    const businessid = request.params.businessID;
    const orderBy = request.params.sortby;
    let sqlQuery = "select * from business where businessid='" + businessid + "'";
    if (orderBy) {
        sqlQuery += ' order by ' + orderBy + ';';
    }
    console.log(sqlQuery);
   pool.query(sqlQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}
 

const getBusinessReviews = (request, response) => {
    const businessid = request.params.businessID;
    pool.query('select * from review where businessid=$1;', [businessid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const postAddCheckin = (request, response) => {
    const businessID = request.body.businessID;
    const today = new Date();
    const dayMapping = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"};
    const day = dayMapping[today.getDay()];
    const checkintime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    pool.query('insert into checkin values ($1, $2, 1, $3)', [day, checkintime, businessID], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const postAddReview = (request, response) => {
    const businessID = request.body.businessID;
    const userID = request.body.userID;
    const reviewID = Date.now();
    const stars = request.body.stars;
    const reviewtext = request.body.reviewtext;
    const cool = request.body.cool;
    const useful = request.body.useful;
    const funny = request.body.funny;
    const today = new Date();
    const datereviewed = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    let sqlQuery = "insert into review(businessid, userid, reviewid, stars, textreview, datereviewed, cool, useful, funny) values ('"+ businessID + "', '" + userID + "', '" + reviewID + "', ";
    if (stars){
        sqlQuery += stars + ", ";
    }
    else {
        sqlQuery += 0 + ", ";
    }
    if (reviewtext){
        sqlQuery += "'" +  reviewtext + "', ";    
    }
    else {
        sqlQuery += "'-' , ";
    }

    sqlQuery += "'" + datereviewed + "', ";

    if (cool){
        sqlQuery += cool + ", ";
    }
    else {
        sqlQuery += 0 + ", ";
    }
    if (useful){
        sqlQuery += useful + ", ";
    }
    else {
        sqlQuery += 0 + ", ";
    }
    if (funny){
        sqlQuery += funny;
    }
    else{
        sqlQuery += 0;
    }
    
    sqlQuery += ");";
    console.log(sqlQuery); 
    pool.query(sqlQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const delRemoveFavBusiness = (request, response) => {
    const userID = request.params.userID;
    const businessID = request.params.businessID;
    pool.query('delete from favorite where businessid=$1 and userid=$2', [businessID, userID], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const postAddFavBusiness = (request, response) => {
    const businessID = request.body.businessID;
    const userID = request.body.userID;
    pool.query('insert into favorite values ($1, $2)', [userID, businessID], (error, results) => {
        if (error) {
                throw error
        }
        response.status(200).json({message: 'Insert successful'})
    });

}



const putEditUserLocation = (request, response) => {
    const longitude = request.body.longitude;
    const latitude = request.body.latitude;
    const userID = request.params.userID;
    pool.query('update usertable set longitude=$1, latitude=$2 where userid=$3', [longitude, latitude, userID], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({message: 'Update successful'})
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
    getFavoriteBusinesses,
    getUserFriends,
    getFriendTips,
    getBusinessInfo,
    getBusinessInfoOrder,
    getBusinessReviews,
    postAddCheckin,
    postAddReview,
    delRemoveFavBusiness,
    postAddFavBusiness,        
    putEditUserLocation,
}
