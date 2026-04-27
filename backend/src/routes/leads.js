const express = require("express");
const controller = require("../controllers/leadsController");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { leadsValidators, commonValidators } = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/", asyncHandler(controller.getAll));
router.get("/pipeline", asyncHandler(controller.pipeline));
router.get("/:id", commonValidators.uuidParam, asyncHandler(controller.getById));
router.post("/", authorizeRoles("admin", "vendedor"), leadsValidators.create, asyncHandler(controller.create));
router.put("/:id", authorizeRoles("admin", "vendedor"), leadsValidators.update, asyncHandler(controller.update));
router.delete("/:id", authorizeRoles("admin"), commonValidators.uuidParam, asyncHandler(controller.remove));

module.exports = router;
