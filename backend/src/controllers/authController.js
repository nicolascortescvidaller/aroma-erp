const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByEmail } = require("../models/authModel");
const { successResponse, errorResponse } = require("../utils/response");

async function login(req, res) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json(errorResponse("Credenciales invalidas", "INVALID_CREDENTIALS"));
  }

  const valid = user.password_hash.startsWith("$2")
    ? await bcrypt.compare(password, user.password_hash).catch(() => false)
    : password === user.password_hash;
  if (!valid) {
    return res.status(401).json(errorResponse("Credenciales invalidas", "INVALID_CREDENTIALS"));
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
  );

  return res.json(
    successResponse(
      {
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      },
      "Login exitoso"
    )
  );
}

async function logout(_req, res) {
  return res.json(successResponse({}, "Logout exitoso"));
}

module.exports = {
  login,
  logout
};
