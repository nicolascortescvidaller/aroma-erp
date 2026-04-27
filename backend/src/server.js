require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initSupabasePool } = require("./config/database");
const { errorResponse, successResponse } = require("./utils/response");

const authRoutes = require("./routes/auth");
const clientesRoutes = require("./routes/clientes");
const maquinasRoutes = require("./routes/maquinas");
const mantenimientosRoutes = require("./routes/mantenimientos");
const productosRoutes = require("./routes/productosLaboratorio");
const inventarioRoutes = require("./routes/inventario");
const quejasRoutes = require("./routes/quejas");
const leadsRoutes = require("./routes/leads");
const reportesRoutes = require("./routes/reportes");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json(successResponse({ status: "ok" }, "Servicio activo"));
});

app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/maquinas", maquinasRoutes);
app.use("/api/mantenimientos", mantenimientosRoutes);
app.use("/api/productos-laboratorio", productosRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/quejas", quejasRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((_req, res) => {
  res.status(404).json(errorResponse("Ruta no encontrada", "ROUTE_NOT_FOUND"));
});

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  const code = error.code || "INTERNAL_ERROR";
  const message = error.message || "Error interno del servidor";
  res.status(status).json(errorResponse(message, code));
});

function bootstrap() {
  initSupabasePool();
  app.listen(PORT, () => {
    console.log(`ERP Aroma backend escuchando en puerto ${PORT}`);
  });
}

bootstrap();
