const express = require("express");
const {
  getAllProjects,
  getSingleProject,
  getAllProjectsBySearch,
} = require("../controllers/project");
const router = express.Router();

// router.get("/users", user);
router.get("/get-all-projects", getAllProjects);
router.get("/search-projects", getAllProjectsBySearch);
router.get("/get-single-project", getSingleProject);

module.exports = router;
