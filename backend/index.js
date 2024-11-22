const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const authUserRoutes = require("./Routes/authUser");
const authAdminRoutes = require("./Routes/authAdmin");

connection();

app.use(express.json());
app.use(cors());

app.use("/api/authUser", authUserRoutes);
app.use("/api/authAdmin", authAdminRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
