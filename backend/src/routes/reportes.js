const express = require("express");
const controller = require("../controllers/reportesController");
const { authenticate } = require("../middleware/auth");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/operaciones", asyncHandler(controller.operaciones));
router.get("/quejas", asyncHandler(controller.quejas));
router.get("/stock", asyncHandler(controller.stock));
router.get("/maquinas", asyncHandler(controller.maquinas));
router.get("/clientes-riesgo", asyncHandler(controller.clientesRiesgo));

module.exports = router;
