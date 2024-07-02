const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbconfig = require("./db/configuration");
const port = process.env.PORT || 6000;
const issueRoute=require('./routes/issueRoute')
const usersRoute = require("./routes/usersRoute");
const booksRoute=require("./routes/bookRoute")
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute)
app.use("/api/issues", issueRoute)
app.listen(port, () => console.log(`server is running on port ${port}`));
