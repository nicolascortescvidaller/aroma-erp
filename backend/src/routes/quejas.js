const express = require("express");
const controller = require("../controllers/quejasController");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { quejasValidators, commonValidators } = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/", asyncHandler(controller.getAll));
router.get("/sin-resolver", asyncHandler(controller.sinResolver));
router.get("/:id", commonValidators.uuidParam, asyncHandler(controller.getById));
router.post("/", authorizeRoles("admin", "vendedor"), quejasValidators.create, asyncHandler(controller.create));
router.put("/:id", authorizeRoles("admin", "vendedor"), quejasValidators.update, asyncHandler(controller.update));
router.delete("/:id", authorizeRoles("admin"), commonValidators.uuidParam, asyncHandler(controller.remove));

module.exports = router;
