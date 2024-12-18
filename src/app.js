const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const setupSwagger = require("../swagger/swagger");


require('dotenv').config();

// connection in mongodb
connectDatabase();


const app = express();

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

setupSwagger(app);


module.exports = app;

// ap is configured wit routes , middlewares and db connection
