const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getUser,
  changePassword,
} = require("../Controles/Form.js");
const { isAuthenticated } = require("../Auths/middleware.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, getUser);
router.route("/logout").get(logout);
router.route("/changepassword").put(isAuthenticated, changePassword);

module.exports = router;
