const { selectMany } = require("../services/supabase");

async function findUserByEmail(email) {
  const users = await selectMany("usuarios", {
    filters: [{ column: "email", value: email }]
  });
  return users[0] || null;
}

module.exports = {
  findUserByEmail
};
