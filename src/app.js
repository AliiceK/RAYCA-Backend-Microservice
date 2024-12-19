const path = require("path"); 
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const setupSwagger = require("../swagger/swagger");
const cors = require("cors")

require("dotenv").config();



connectDatabase();
const app = express();

app.use(cors());


app.use("/swagger-ui", express.static(path.join(__dirname, "../node_modules/swagger-ui-dist")));

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

setupSwagger(app);

module.exports = app;
