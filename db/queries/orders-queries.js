const db = require('../db');

const getAllOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then((response) => {
      return response.rows;
    });
};


module.exports = {
  getAllOrders
};
