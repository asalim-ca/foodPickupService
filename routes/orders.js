/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const ordersQueries = require('../db/queries/orders-queries');

//GET
router.get("/", (req, res) => {
  ordersQueries.getAllOrders()
    .then((orders) => {
      res.json(orders);
    });
});


module.exports = router;
