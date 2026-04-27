const { body, param, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/response");

const phoneRegex = /^[0-9+() -]{7,20}$/;

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(422).json(
    {
      ...errorResponse("Validacion fallida", "VALIDATION_ERROR"),
      details: errors.array().map((err) => ({
        field: err.path,
        message: err.msg
      }))
    }
  );
}

const commonValidators = {
  uuidParam: [param("id").isUUID().withMessage("ID invalido"), handleValidation],
  login: [
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 6 }),
    handleValidation
  ]
};

const clientesValidators = {
  create: [
    body("nombre").isString().isLength({ min: 2, max: 255 }),
    body("email").optional().isEmail().normalizeEmail(),
    body("telefono").optional().matches(phoneRegex),
    body("direccion").optional().isLength({ max: 1000 }),
    body("tipo").isIn(["restaurante", "hotel", "oficina", "otro"]),
    body("estado").optional().isIn(["activo", "inactivo", "riesgo"]),
    body("vendedor_id").optional().isUUID(),
    handleValidation
  ],
  update: [
    param("id").isUUID(),
    body("email").optional().isEmail().normalizeEmail(),
    body("telefono").optional().matches(phoneRegex),
    body("tipo").optional().isIn(["restaurante", "hotel", "oficina", "otro"]),
    body("estado").optional().isIn(["activo", "inactivo", "riesgo"]),
    body("vendedor_id").optional().isUUID(),
    handleValidation
  ]
};

const maquinasValidators = {
  create: [
    body("cliente_id").isUUID(),
    body("serial").isString().isLength({ min: 3, max: 100 }),
    body("modelo").isString().isLength({ min: 2, max: 255 }),
    body("estado").optional().isIn(["activa", "inactiva", "en_mantenimiento"]),
    body("fecha_instalacion").optional().isISO8601(),
    handleValidation
  ],
  update: [
    param("id").isUUID(),
    body("cliente_id").optional().isUUID(),
    body("serial").optional().isString().isLength({ min: 3, max: 100 }),
    body("estado").optional().isIn(["activa", "inactiva", "en_mantenimiento"]),
    body("fecha_instalacion").optional().isISO8601(),
    handleValidation
  ]
};

const mantenimientosValidators = {
  create: [
    body("maquina_id").isUUID(),
    body("cliente_id").isUUID(),
    body("tipo").isIn(["preventivo", "correctivo"]),
    body("fecha_programada").isISO8601(),
    body("fecha_ejecutada").optional({ nullable: true }).isISO8601(),
    body("tecnico_id").optional({ nullable: true }).isUUID(),
    body("horas_trabajadas").optional().isFloat({ min: 0, max: 999.99 }),
    handleValidation
  ],
  update: [
    param("id").isUUID(),
    body("tipo").optional().isIn(["preventivo", "correctivo"]),
    body("fecha_programada").optional().isISO8601(),
    body("fecha_ejecutada").optional({ nullable: true }).isISO8601(),
    body("tecnico_id").optional({ nullable: true }).isUUID(),
    body("horas_trabajadas").optional().isFloat({ min: 0, max: 999.99 }),
    handleValidation
  ]
};

const productosValidators = {
  create: [
    body("codigo").isString().isLength({ min: 2, max: 50 }),
    body("nombre").isString().isLength({ min: 2, max: 255 }),
    body("costo_unitario").isFloat({ min: 0 }),
    body("precio_venta").isFloat({ min: 0 }),
    body("cantidad_minima").optional().isInt({ min: 0 }),
    handleValidation
  ],
  update: [
    param("id").isUUID(),
    body("costo_unitario").optional().isFloat({ min: 0 }),
    body("precio_venta").optional().isFloat({ min: 0 }),
    body("cantidad_minima").optional().isInt({ min: 0 }),
    handleValidation
  ]
};

const inventarioValidators = {
  create: [
    body("producto_id").isUUID(),
    body("cantidad_actual").optional().isInt({ min: 0 }),
    body("ubicacion").optional().isString().isLength({ max: 120 }),
    handleValidation
  ],
  update: [
    param("id").isUUID(),
    body("producto_id").optional().isUUID(),
    body("cantidad_actual").optional().isInt({ min: 0 }),
    body("ubicacion").optional().isString().isLength({ max: 120 }),
    handleValidation
  ],
  movimiento: [
    body("inventario_id").isUUID(),
    body("tipo").isIn(["entrada", "salida"]),
    body("origen").isIn(["compra", "devolucion", "venta", "uso_interno", "ajuste"]),
    body("cantidad").isInt({ min: 1 }),
    body("costo_unitario").isFloat({ min: 0 }),
    handleValidation
  ]
};

const quejasValidators = {
  create: [
    body("cliente_id").isUUID(),
    body("descripcion").isString().isLength({ min: 10, max: 5000 }),
    body("categoria").isIn(["producto", "servicio", "entrega", "otro"]),
    body("estado").optional().isIn(["abierta", "en_progreso", "resuelta"]),
    body("responsable_id").optional({ nullable: true }).isUUID(),
    handleValidation
  ],
  update: [
    param("id").isUUID(),
    body("categoria").optional().isIn(["producto", "servicio", "entrega", "otro"]),
    body("estado").optional().isIn(["abierta", "en_progreso", "resuelta"]),
    body("responsable_id").optional({ nullable: true }).isUUID(),
    handleValidation
  ]
};

const leadsValidators = {
  create: [
    body("nombre").isString().isLength({ min: 2, max: 255 }),
    body("empresa").optional().isString().isLength({ max: 255 }),
    body("email").optional().isEmail().normalizeEmail(),
    body("telefono").optional().matches(phoneRegex),
    body("etapa").optional().isIn(["lead", "cotizacion", "ganado", "perdido"]),
    body("vendedor_id").optional({ nullable: true }).isUUID(),
    body("monto_esperado").optional().isFloat({ min: 0 }),
    handleValidation
  ],
  update: [
    param("id").isUUID(),
    body("email").optional().isEmail().normalizeEmail(),
    body("telefono").optional().matches(phoneRegex),
    body("etapa").optional().isIn(["lead", "cotizacion", "ganado", "perdido"]),
    body("vendedor_id").optional({ nullable: true }).isUUID(),
    body("monto_esperado").optional().isFloat({ min: 0 }),
    handleValidation
  ]
};

module.exports = {
  commonValidators,
  clientesValidators,
  maquinasValidators,
  mantenimientosValidators,
  productosValidators,
  inventarioValidators,
  quejasValidators,
  leadsValidators
};
