const db = require('../db');

const getAllCustomers = () => {
  return db.query('SELECT * FROM customers;')
    .then((response) => {
      return response.rows;
    });
};

const findCustomerByEmail = (email) => {
  return db.query('SELECT * FROM customers WHERE email = $1;', [email])
    .then((response) => {
      if (response.rows.length === 0) {
        return false;
      }
        return true;
    });
};


module.exports = {
  getAllCustomers,
  findCustomerByEmail
};
