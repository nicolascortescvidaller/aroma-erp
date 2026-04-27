const express = require("express");
const controller = require("../controllers/maquinasController");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { maquinasValidators, commonValidators } = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", commonValidators.uuidParam, asyncHandler(controller.getById));
router.post("/", authorizeRoles("admin", "tecnico"), maquinasValidators.create, asyncHandler(controller.create));
router.put("/:id", authorizeRoles("admin", "tecnico"), maquinasValidators.update, asyncHandler(controller.update));
router.delete("/:id", authorizeRoles("admin"), commonValidators.uuidParam, asyncHandler(controller.remove));

module.exports = router;
