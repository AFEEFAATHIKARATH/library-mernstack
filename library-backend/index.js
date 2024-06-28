const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbconfig = require("./db/configuration");
const port = process.env.PORT || 6000;

const usersRoute = require("./routes/usersRoute");

app.use("./api/users", usersRoute);
app.listen(port, () => console.log(`server is running on port ${port}`));
