const { getSupabaseClient } = require("../config/database");
const { AppError } = require("../utils/errors");

function cleanPayload(payload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );
}

async function selectMany(table, options = {}) {
  const client = getSupabaseClient();
  let query = client.from(table).select(options.select || "*");

  if (options.filters) {
    options.filters.forEach((filter) => {
      if (filter.op === "ilike") query = query.ilike(filter.column, filter.value);
      else if (filter.op === "gte") query = query.gte(filter.column, filter.value);
      else if (filter.op === "lte") query = query.lte(filter.column, filter.value);
      else if (filter.op === "in") query = query.in(filter.column, filter.value);
      else query = query.eq(filter.column, filter.value);
    });
  }

  if (options.orderBy) {
    query = query.order(options.orderBy.column, {
      ascending: options.orderBy.ascending ?? false
    });
  }

  const { data, error } = await query;
  if (error) throw new AppError(error.message, 400, "DB_SELECT_ERROR");
  return data;
}

async function selectOneById(table, id, select = "*") {
  const client = getSupabaseClient();
  const { data, error } = await client.from(table).select(select).eq("id", id).maybeSingle();
  if (error) throw new AppError(error.message, 400, "DB_SELECT_ERROR");
  return data;
}

async function insertOne(table, payload, select = "*") {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(table)
    .insert(cleanPayload(payload))
    .select(select)
    .single();
  if (error) throw new AppError(error.message, 400, "DB_INSERT_ERROR");
  return data;
}

async function updateOne(table, id, payload, select = "*") {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(table)
    .update(cleanPayload(payload))
    .eq("id", id)
    .select(select)
    .maybeSingle();
  if (error) throw new AppError(error.message, 400, "DB_UPDATE_ERROR");
  return data;
}

async function deleteOne(table, id, select = "id") {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(table)
    .delete()
    .eq("id", id)
    .select(select)
    .maybeSingle();
  if (error) throw new AppError(error.message, 400, "DB_DELETE_ERROR");
  return data;
}

module.exports = {
  cleanPayload,
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
};
