const express = require("express");
const cors = require("cors");
require("dotenv").config();
const promoterRoutes = require("./src/routes/project");
const agentRoutes = require("./src/routes/agentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/project", promoterRoutes);
app.use("/api/v1/agent", agentRoutes);

app.listen(3000, () => console.log("Server listening on port 3000"));
