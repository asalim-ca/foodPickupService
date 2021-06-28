// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//New routes
const customersRoutes = require("./routes/customers");
const dishesRoutes = require("./routes/dishes");
const ordersRoutes = require("./routes/orders");

//stretch
// const orderRatingsRoutes = require("./routes/order_ratings");

// Note: mount other resources here, using the same pattern above
app.use("/api/customers", customersRoutes);
app.use("/api/dishes", dishesRoutes);
app.use("/api/orders", ordersRoutes);

//stretch
// app.use("/api/order_ratings", orderRatingsRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Online app listening on port ${PORT}`);
});
