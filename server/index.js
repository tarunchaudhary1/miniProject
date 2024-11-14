require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const adminRoutes = require("./Routes/admin");
const userRoutes = require("./Routes/users");
const authUserRoutes = require("./Routes/authUser");
const authAdminRoutes = require("./Routes/authAdmin");
const mcqQRoutes = require("./Routes/mcqQs");
const compQRoutes = require("./Routes/compQs");
const mcqQuizRoutes = require("./Routes/mcqQuizzes");
const compQuizRoutes = require("./Routes/compQuizzes");
const mcqResultRoutes = require("./Routes/mcqResults");
const compResultRoutes = require("./Routes/compResults");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authUser", authUserRoutes);
app.use("/api/authAdmin", authAdminRoutes);
app.use("/api/mcqQs", mcqQRoutes);
app.use("/api/compQs", compQRoutes);
app.use("/api/mcqQuizzes", mcqQuizRoutes);
app.use("/api/compQuizzes", compQuizRoutes);
app.use("/api/mcqResults", mcqResultRoutes);
app.use("/api/compResults", compResultRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

