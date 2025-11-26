const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

// Login Page
router.get("/login", adminController.loginPage);
// Login Submit
router.post("/loginsubmit", adminController.login);
// Dashboard (protected route)
router.get("/dashboard", auth, adminController.dashboard);


module.exports = router;
