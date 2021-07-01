const db = require('../db');

const getAllOrdersForCustomer = (id) => {
  return db.query('SELECT orders.id as order_id, * FROM orders JOIN customers ON customer_id = customers.id JOIN dishes ON dish_id = dishes.id WHERE customers.id = $1;', [id])
    .then((response) => {
      return response.rows;
    });
};

const getSpecificOrder = (customerId, orderId) => {
  //needs work, order id shows something different
  return db.query('SELECT * FROM orders JOIN customers ON customer_id = customers.id WHERE customers.id = $1 AND orders.id = $2;',[customerId, orderId])
    .then((response) => {
      return response.rows[0];
    });
};

const getAllUnfulfilledOrders = () => {
  return db.query('SELECT orders.id as order_id, * FROM orders JOIN customers ON customer_id = customers.id JOIN dishes ON dish_id = dishes.id WHERE finished_at IS NULL;')
    .then((response) => {
      return response.rows;
    });
};

// 'SELECT orders.id as order_id, * FROM orders JOIN customers ON customer_id = customers.id JOIN dishes ON dish_id = dishes.id WHERE finished_at IS NULL AND customers.id = $1;'
const getAllUnfulfilledOrdersForCustomer = (customerId) => {
  return db.query('SELECT orders.id as order_id, * FROM orders JOIN customers ON customer_id = customers.id JOIN dishes ON dish_id = dishes.id WHERE customers.id = $1;', [customerId])
    .then((response) => {
      console.log(response.rows);
      return response.rows;
    });
};

module.exports = {
  getAllUnfulfilledOrders,
  getSpecificOrder,
  getAllOrdersForCustomer,
  getAllUnfulfilledOrdersForCustomer
};
