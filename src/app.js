const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

// Set-up routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Manuel Bauer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Manuel Bauer",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Manuel Bauer",
    helpText: "Help Message",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          query: req.query.address,
          location,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Manuel Bauer",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Manuel Bauer",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
