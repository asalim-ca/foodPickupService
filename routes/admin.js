/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const adminQueries = require('../db/queries/admin-queries');
const ordersQueries = require('../db/queries/orders-queries');

//GET
router.get("/", (req, res) => {
  res.render("adminLogin")
});

router.post("/", (req, res) => {
  adminQueries.findAdminbyEmail(req.body.email)
    .then((response) => {
      if (response) {
        req.session.loginType = "admin";
        req.session.userId = response.id;
        return res.redirect("/")
      }else{
        return res.send("not logged in")
      }
    });
});

//Get unfulfilled orders
router.get("/unfulfilledorders", (req, res) => {
  ordersQueries.getAllUnfulfilledOrders()
    .then((response) => {
      res.json(response);
    })
})


module.exports = router;
