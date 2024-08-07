const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth-controller");
const jwtAuth = require("../../middleware/tokenVerification");

router.post("/signup", authController.signUp);

router.post("/signin", authController.login);

router.post("/verification", jwtAuth.verifyToken);

module.exports = router;
