/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const customersQueries = require('../db/queries/customers-queries');

//GET
router.get("/", (req, res) => {
  customersQueries.getAllCustomers()
    .then((customers) => {
      res.json(customers);
    });
});



module.exports = router;
