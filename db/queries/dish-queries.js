const db = require('../db');

const getAllDishes = () => {
  return db.query('SELECT * FROM dishes;')
    .then((response) => {
      return response.rows;
    });
};

const getOneDish = (id) => {
  return db.query('SELECT * FROM dishes WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getAllDishes,
  getOneDish
};
