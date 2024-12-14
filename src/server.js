const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");


dotenv.config();


const app = express();


app.use(express.json());

connectDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));