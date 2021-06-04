const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Importing geocode and forecast
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve assets to server
app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;

// app.get basically says "when user gets this page ... do this"
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Youssef Gendy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Youssef Gendy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Youssef Gendy",
    helpMessage: "Is something wrong? How can we help.",
  });
});

//////////////////////////

app.get("/weather", (req, res) => {
  const query = req.query;
  if (!query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData.description,
        location,
        address: query.address,
        image: forecastData.image,
      });
    });
  });
});

////////////////////////////

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    name: "Youssef Gendy",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    name: "Youssef Gendy",
  });
});

// One statement to actually set up server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
