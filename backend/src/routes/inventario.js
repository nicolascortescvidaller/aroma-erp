const express = require("express");
const controller = require("../controllers/inventarioController");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { inventarioValidators, commonValidators } = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/", asyncHandler(controller.getAll));
router.get("/bajo-stock", asyncHandler(controller.getBajoStock));
router.get("/movimientos", asyncHandler(controller.getMovimientos));
router.get("/:id", commonValidators.uuidParam, asyncHandler(controller.getById));
router.post("/", authorizeRoles("admin", "laboratorio"), inventarioValidators.create, asyncHandler(controller.create));
router.put("/:id", authorizeRoles("admin", "laboratorio"), inventarioValidators.update, asyncHandler(controller.update));
router.delete("/:id", authorizeRoles("admin"), commonValidators.uuidParam, asyncHandler(controller.remove));
router.post(
  "/movimientos",
  authorizeRoles("admin", "laboratorio", "tecnico"),
  inventarioValidators.movimiento,
  asyncHandler(controller.createMovimiento)
);

module.exports = router;
