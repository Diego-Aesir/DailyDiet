const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getUserId = async (username, password) => {
  const sql = `SELECT id FROM users WHERE username = $1 AND password = $2`;
  const { rows } = await pool.query(sql, [username, password]);
  if (rows.length > 0) {
    return rows[0].id;
  } else {
    throw new Error("User not found");
  }
};

const registerUser = async (username, password, weight) => {
  const { rows } = await verifyUserNameExists(username);
  if (rows.length === 0) {
    const sql = `INSERT INTO users(username, password, weight) VALUES ($1, $2, $3) RETURNING *`;
    const { rows: newUser } = await pool.query(sql, [
      username,
      password,
      weight,
    ]);
    return newUser[0];
  } else {
    throw new Error("Username already exists");
  }
};

const verifyUserNameExists = async (username) => {
  const sql = `SELECT * FROM users WHERE username = $1`;
  const { rows } = await pool.query(sql, [username]);
  return { rows };
};

const alterUserName = async (user_id, newUserName) => {
  const { rows } = await verifyUserNameExists(newUserName);
  if (rows.length === 0) {
    const sql = `UPDATE users SET username = $1 WHERE id = $2 RETURNING *`;
    const { rows: updatedUser } = await pool.query(sql, [newUserName, user_id]);
    return updatedUser[0];
  } else {
    throw new Error("Username is already in use");
  }
};

const alterPassword = async (user_id, newPassword) => {
  const sql = `UPDATE users SET password = $1 WHERE id = $2 RETURNING *`;
  const { rows: updatedUser } = await pool.query(sql, [newPassword, user_id]);
  return updatedUser[0];
};

const alterWeight = async (user_id, newWeight) => {
  const sql = `UPDATE users SET weight = $1 WHERE id = $2 RETURNING *`;
  const { rows: updatedUser } = await pool.query(sql, [newWeight, user_id]);
  return updatedUser[0];
};
