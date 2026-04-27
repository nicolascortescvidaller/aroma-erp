const express = require("express");
const controller = require("../controllers/productosLaboratorioController");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { productosValidators, commonValidators } = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", commonValidators.uuidParam, asyncHandler(controller.getById));
router.post("/", authorizeRoles("admin", "laboratorio"), productosValidators.create, asyncHandler(controller.create));
router.put("/:id", authorizeRoles("admin", "laboratorio"), productosValidators.update, asyncHandler(controller.update));
router.delete("/:id", authorizeRoles("admin"), commonValidators.uuidParam, asyncHandler(controller.remove));

module.exports = router;
