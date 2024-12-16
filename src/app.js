const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");


dotenv.config();
// connection in mongodb
connectDatabase();


// express app crrated
const app = express();

// middleware is added to parse JSON requests
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));




module.exports = app;

// ap is configured wit routes , middlewares and db connection
