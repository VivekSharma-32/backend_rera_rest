const express = require("express");
const { getAllAgents } = require("../controllers/agent");
const router = express.Router();

// router.get("/users", user);
router.get("/get-all-agents", getAllAgents);

module.exports = router;
