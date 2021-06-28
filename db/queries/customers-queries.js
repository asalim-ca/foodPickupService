const db = require('../db');

const getAllCustomers = () => {
  return db.query('SELECT * FROM customers;')
    .then((response) => {
      return response.rows;
    });
};

const getOneCustomer = (id) => {
  return db.query('SELECT * FROM customers WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getAllCustomers,
  getOneCustomer
};
