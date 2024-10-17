const { Client } = require("pg");
require('dotenv').config();

const CREATE_DATA_BASE = `CREATE DATABASE daily_diet`;
const CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
weight FLOAT NOT NULL,
height FLOAT NOT NULL,
age INT NOT NULL)`;
const CREATE_DIET_TABLE = `CREATE TABLE IF NOT EXISTS diets (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
protein FLOAT,
carbs FLOAT,
fat FLOAT,
calories FLOAT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`;
const CREATE_MEALS_TABLE = `CREATE TABLE IF NOT EXISTS meals (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
protein FLOAT,
carbs FLOAT,
fat FLOAT,
calories FLOAT,
diet_id INT,
FOREIGN KEY (diet_id) REFERENCES diets(id) ON DELETE CASCADE)`;
const CREATE_FOOD_TABLE = `CREATE TABLE IF NOT EXISTS food(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
amount VARCHAR(255) NOT NULL,
protein FLOAT NOT NULL,
carbs FLOAT NOT NULL,
fat FLOAT NOT NULL,
meals_id INT,
FOREIGN KEY (meals_id) REFERENCES meals(id) ON DELETE CASCADE)`;

async function createClient() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    return client;
}

async function createDatabase() {
  const client = await createClient();
  try {
    await client.query(CREATE_DATA_BASE);
  } catch (err) {
    console.log("Database alredy exists");
  } finally {
    await client.end();
  }
}

async function createTables() {
  const client = await createClient();
  try {
    await client.query(CREATE_USER_TABLE);
    await client.query(CREATE_DIET_TABLE);
    await client.query(CREATE_MEALS_TABLE);
    await client.query(CREATE_FOOD_TABLE);
  } catch (err) {
    console.log("Erro while creating Tables", err);
  } finally {
    await client.end();
  }
}

async function main() {
  try {
    await createDatabase();
    await createTables();
  } catch (err) {
    console.log("Error while creating database or table", err);
  }
}

module.exports = {
  main,
};
