const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth-controller");

router.post("/signup", authController.signUp);

router.post("/signin", authController.login);

module.exports = router;
