const db = require('../db');

const getAllCustomers = () => {
  return db.query('SELECT * FROM customers;')
    .then((response) => {
      return response.rows;
    });
};


module.exports = {
  getAllCustomers
};
