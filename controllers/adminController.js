const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports = {

  // Render Login Page
  loginPage: (req, res) => {
    res.render("admin/login", { message: req.flash("error") });
  },

  // Handle Login
  login: async (req, res) => {

    // 1. Request body check
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("error", "Invalid Email, User Not Found");
      return res.redirect("/admin/login");
    }

    let hashedPassword = user.password.replace(/^\$2y\$/, "$2b$");
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      req.flash("error", "Invalid Email or Password");
      return res.redirect("/admin/login");
    }

    req.session.user = user;
    res.redirect("/admin/dashboard");
  },

  // Dashboard
  dashboard: (req, res) => {
    res.render("admin/index");
  },

};