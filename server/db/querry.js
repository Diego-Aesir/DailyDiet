const { Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const registerUser = async (username, password, weight) => {
  const { rows } = await verifyUserNameExists(username);
  if (rows.length === 0) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users(username, password, weight) VALUES ($1, $2, $3) RETURNING *`;
    try {
      const { rows: newUser } = await pool.query(sql, [
        username,
        hashedPassword,
        weight,
      ]);
      return newUser[0];
    } catch (error) {
      throw new Error("Error while registering user: " + error.message);
    }
  } else {
    throw new Error("Username already exists");
  }
};

const loginUser = async (username, password) => {
  const sql = `SELECT * FROM users WHERE username = $1`;
  try {
    const { rows: userLogged } = await pool.query(sql, [username]);
    if (userLogged.length === 0) {
      throw new Error("Username is incorrect");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      userLogged[0].password
    );
    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }
    return userLogged[0].id;
  } catch (error) {
    throw new Error("Error while logging in: " + error.message);
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
    try {
      const { rows: updatedUser } = await pool.query(sql, [
        newUserName,
        user_id,
      ]);
      return updatedUser[0];
    } catch (error) {
      throw new Error("Error while updating username: " + error.message);
    }
  } else {
    throw new Error("Username is already in use");
  }
};

const alterPassword = async (user_id, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const sql = `UPDATE users SET password = $1 WHERE id = $2 RETURNING *`;
  try {
    const { rows: updatedUser } = await pool.query(sql, [
      hashedPassword,
      user_id,
    ]);
    return updatedUser[0];
  } catch (error) {
    throw new Error("Error while updating password: " + error.message);
  }
};

const alterWeight = async (user_id, newWeight) => {
  const sql = `UPDATE users SET weight = $1 WHERE id = $2 RETURNING *`;
  try {
    const { rows: updatedUser } = await pool.query(sql, [newWeight, user_id]);
    return updatedUser[0];
  } catch (error) {
    throw new Error("Error while updating weight: " + error.message);
  }
};
