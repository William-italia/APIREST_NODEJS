const pool = require("../config/db");

const findAll = async () => {
  const result = await pool.query("SELECT * FROM users");

  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(
    "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
    [data.name, data.email],
  );

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [data.name, data.email, id],
  );

  if (result.rowCount === 0) return null;

  return result.rows[0];
};

const del = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [
    id,
  ]);

  if (result.rowCount === 0) return null;

  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  del,
};
