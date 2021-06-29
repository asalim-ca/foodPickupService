const db = require('../db');

const getAllOrdersForCustomer = (id) => {
  return db.query('SELECT * FROM orders JOIN customers ON customer_id = customers.id WHERE customers.id = $1;', [id])
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
  return db.query('SELECT * FROM orders WHERE finished_at IS NULL;')
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getAllUnfulfilledOrders,
  getSpecificOrder,
  getAllOrdersForCustomer
};
