const express = require("express");
const { login, logout } = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const { commonValidators } = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.post("/login", commonValidators.login, asyncHandler(login));
router.post("/logout", authenticate, asyncHandler(logout));

module.exports = router;
