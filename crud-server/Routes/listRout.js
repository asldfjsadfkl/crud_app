const express = require("express");
const {
  create,
  GetOne,
  GetAll,
  Delete,
  Update,
} = require("../Controles/conList.js");
const { isAuthenticated } = require("../Auths/middleware.js");
const router = express.Router();

router.route("/create").post(isAuthenticated, create);

router.route("/getall").get(GetAll);
router.route("/:id").delete(isAuthenticated, Delete);
router.route("/:id").put(isAuthenticated, Update);
router.route("/:id").get(isAuthenticated, GetOne);

module.exports = router;
