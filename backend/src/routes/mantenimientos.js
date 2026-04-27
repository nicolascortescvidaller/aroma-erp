const express = require("express");
const controller = require("../controllers/mantenimientosController");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { mantenimientosValidators, commonValidators } = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", commonValidators.uuidParam, asyncHandler(controller.getById));
router.post("/", authorizeRoles("admin", "tecnico"), mantenimientosValidators.create, asyncHandler(controller.create));
router.put("/:id", authorizeRoles("admin", "tecnico"), mantenimientosValidators.update, asyncHandler(controller.update));
router.delete("/:id", authorizeRoles("admin"), commonValidators.uuidParam, asyncHandler(controller.remove));
router.post("/alertas", authorizeRoles("admin", "tecnico"), asyncHandler(controller.alertas));

module.exports = router;
