const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json(errorResponse("Token no proporcionado", "UNAUTHORIZED"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json(errorResponse("Token invalido o expirado", "INVALID_TOKEN"));
  }
}

function authorizeRoles(...allowedRoles) {
  return function roleGuard(req, res, next) {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      return res.status(403).json(errorResponse("No autorizado para esta operacion", "FORBIDDEN"));
    }
    return next();
  };
}

module.exports = {
  authenticate,
  authorizeRoles
};
