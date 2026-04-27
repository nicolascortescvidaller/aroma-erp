const { createClient } = require("@supabase/supabase-js");
const { AppError } = require("../utils/errors");

let pool = [];
let counter = 0;

function initSupabasePool() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const poolSize = Number(process.env.SUPABASE_POOL_SIZE || 5);

  if (!url || !serviceKey) {
    throw new AppError(
      "Faltan variables SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY",
      500,
      "MISSING_SUPABASE_CONFIG"
    );
  }

  pool = Array.from({ length: poolSize }).map(() =>
    createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: {
          "x-erp-client": "aroma-backend"
        }
      }
    })
  );
}

function getSupabaseClient() {
  if (!pool.length) {
    initSupabasePool();
  }
  const client = pool[counter % pool.length];
  counter += 1;
  return client;
}

module.exports = {
  initSupabasePool,
  getSupabaseClient
};
