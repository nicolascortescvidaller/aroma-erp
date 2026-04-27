# ERP Aroma - Backend Express (PASO 2)

Backend REST para ERP Aroma Marketing S.A.S. con autenticacion JWT, roles, validaciones y conexion a Supabase.

## Stack

- Node.js + Express
- Supabase (`@supabase/supabase-js`) con pool logico de clientes
- JWT (`jsonwebtoken`)
- Validacion (`express-validator`)

## Estructura

```text
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Instalacion

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Variables de entorno

```env
SUPABASE_URL=https://aroma-erp.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=8h
NODE_ENV=development
PORT=3001
SUPABASE_POOL_SIZE=5
```

## Endpoints implementados

### Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`

### Clientes

- `GET /api/clientes`
- `GET /api/clientes/:id`
- `POST /api/clientes`
- `PUT /api/clientes/:id`
- `DELETE /api/clientes/:id`

### Maquinas

- `GET /api/maquinas`
- `GET /api/maquinas/:id`
- `POST /api/maquinas`
- `PUT /api/maquinas/:id`
- `DELETE /api/maquinas/:id`

### Mantenimientos

- `GET /api/mantenimientos`
- `GET /api/mantenimientos/:id`
- `POST /api/mantenimientos`
- `PUT /api/mantenimientos/:id`
- `DELETE /api/mantenimientos/:id`
- `POST /api/mantenimientos/alertas`

### Productos laboratorio

- `GET /api/productos-laboratorio`
- `GET /api/productos-laboratorio/:id`
- `POST /api/productos-laboratorio`
- `PUT /api/productos-laboratorio/:id`
- `DELETE /api/productos-laboratorio/:id`

### Inventario

- `GET /api/inventario`
- `GET /api/inventario/:id`
- `POST /api/inventario`
- `PUT /api/inventario/:id`
- `DELETE /api/inventario/:id`
- `GET /api/inventario/movimientos`
- `POST /api/inventario/movimientos`
- `GET /api/inventario/bajo-stock`

### Quejas

- `GET /api/quejas`
- `GET /api/quejas/sin-resolver`
- `GET /api/quejas/:id`
- `POST /api/quejas`
- `PUT /api/quejas/:id`
- `DELETE /api/quejas/:id`

### Leads

- `GET /api/leads`
- `GET /api/leads/pipeline`
- `GET /api/leads/:id`
- `POST /api/leads`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id`

### Reportes y dashboard

- `GET /api/reportes/operaciones`
- `GET /api/reportes/quejas`
- `GET /api/reportes/stock`
- `GET /api/reportes/maquinas`
- `GET /api/reportes/clientes-riesgo`
- `GET /api/dashboard`

## Seguridad y roles

- Header requerido: `Authorization: Bearer <token>`
- Roles soportados: `admin`, `vendedor`, `tecnico`, `laboratorio`
- Middleware:
  - `authenticate`: valida JWT
  - `authorizeRoles(...)`: restringe por rol

## Formato de respuestas

### Exito

```json
{
  "success": true,
  "data": {},
  "message": "Operacion exitosa"
}
```

### Error

```json
{
  "success": false,
  "error": "Mensaje de error",
  "code": "ERROR_CODE"
}
```

## Notas importantes

- `login` compara con hash bcrypt si el valor de `password_hash` inicia con `$2`; de lo contrario compara texto plano (modo semilla/desarrollo).
- El endpoint `POST /api/mantenimientos/alertas` ya incluye un stub de IA en `src/services/claude.js` para integrar Anthropic en PASO 4.
