const { Pool } = require('pg');
// require('dotenv').config();

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryParams = [email];
  const queryString = `
  SELECT * FROM users
  WHERE email = $1
  `;
  return pool.query(queryString, queryParams)
    .then(res => {
      if (res.rows[0]) {
        return res.rows[0];
      }
      return null;
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [id])
    .then(res => {
      if (res.rows[0]) {
        return res.rows[0];
      }
      return null;
    });
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  console.log([user.name, user.email, user.password]);
  const queryParams = [user.name, user.email, user.password];
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryParams = guest_id;
  const queryString = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT ${limit};
  `;
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    let city = options.city;
    let id = Number(options.city);

    if (isNaN(id)) {
      queryParams.push(`%${city}%`);
      queryString += `WHERE city ILIKE $${queryParams.length} `;
    }
    if (!isNaN(id)) {
      queryParams.push(id);
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }
  }

  if (options.minimum_price_per_night) {
    const minPrice = Number(options.minimum_price_per_night) * 100;
    queryParams.push(minPrice);
    queryString += `AND cost_per_night > $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    const maxPrice = Number(options.maximum_price_per_night) * 100;
    queryParams.push(maxPrice);
    queryString += `AND cost_per_night < $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `GROUP BY properties.id HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  //If no minimum rating is entered add teh GROUP BY clause here
  if (!options.minimum_rating) {
    queryString += `GROUP BY properties.id`;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
 const costPerNight = Number(property.cost_per_night);
 const numOfBaths = Number(property.number_of_bathrooms);
 const numOfBeds = Number(property.number_of_bedrooms);
 const numOfParking = Number(property.parking_spaces)
 const queryParams = [property.title, property.description, property.owner_id, property.cover_photo_url, 
  property.thumbnail_photo_url, costPerNight, numOfParking, numOfBaths, 
  numOfBeds, property.province, property.city, property.country, property.street, property.post_code];
 
 let queryString = `
INSERT INTO properties (
  title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, 
  number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *;
 `;
 console.log(queryString, queryParams)
 return pool.query(queryString, queryParams)
   .then(res => res.rows);
};
exports.addProperty = addProperty;
