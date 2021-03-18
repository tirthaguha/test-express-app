if (!process.env.NODE_ENV) {
  require("dotenv").config();
}

var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nocache = require("nocache");
var helmet = require("helmet");
var cors = require("cors");

var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(nocache());
app.use(helmet.xssFilter());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(cors());

app.use("/users", usersRouter);

module.exports = app;
