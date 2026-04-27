export type UserRole = "admin" | "vendedor" | "tecnico" | "laboratorio";

export interface AuthUser {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message: string;
}

export interface ApiError {
  success: false;
  error: string;
  code: string;
}

export interface KPIData {
  maquinas_activas: number;
  stock_alertas: number;
  quejas_pendientes: number;
  clientes_riesgo: number;
}

export interface Cliente {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  tipo: "restaurante" | "hotel" | "oficina" | "otro";
  estado: "activo" | "inactivo" | "riesgo";
  vendedor_id?: string;
  creado_en?: string;
}

export interface Lead {
  id: string;
  nombre: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  etapa: "lead" | "cotizacion" | "ganado" | "perdido";
  vendedor_id?: string;
  monto_esperado?: number;
  fecha_creacion?: string;
}

export interface Mantenimiento {
  id: string;
  cliente_id: string;
  maquina_id: string;
  tipo: "preventivo" | "correctivo";
  fecha_programada: string;
  fecha_ejecutada?: string;
  tecnico_id?: string;
  problema?: string;
  solucion?: string;
  proxima_fecha?: string;
  horas_trabajadas?: number;
}

export interface Inventario {
  id: string;
  producto_id: string;
  cantidad_actual: number;
  ubicacion: string;
  valor_total: number;
}

export interface Queja {
  id: string;
  cliente_id: string;
  descripcion: string;
  categoria: "producto" | "servicio" | "entrega" | "otro";
  estado: "abierta" | "en_progreso" | "resuelta";
  responsable_id?: string;
  fecha_creacion?: string;
  fecha_resolucion?: string;
}

export interface ChartPoint {
  name: string;
  value: number;
}
