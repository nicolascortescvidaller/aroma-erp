const express = require("express");
const controller = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/auth");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);
router.get("/", asyncHandler(controller.getDashboard));

module.exports = router;
