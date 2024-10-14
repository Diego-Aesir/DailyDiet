const { Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const registerUser = async (username, password, weight, height, age) => {
  const { rows } = await verifyUserNameExists(username);
  if (rows.length === 0) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users(username, password, weight, height, age) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    try {
      const { rows: newUser } = await pool.query(sql, [
        username,
        hashedPassword,
        weight,
        height,
        age,
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

const alterHeight = async (user_id, newHeight) => {
  const sql = `UPDATE users SET height = $1 WHERE id = $2 RETURNING *`;
  try {
    const { rows: updatedUser } = await pool.query(sql, [newHeight, user_id]);
    return updatedUser[0];
  } catch (error) {
    throw new Error("Error while updating height: " + error.message);
  }
};

const alterAge = async (user_id, newAge) => {
  const sql = `UPDATE users SET age = $1 WHERE id = $2 RETURNING *`;
  try {
    const { rows: updatedUser } = await pool.query(sql, [newAge, user_id]);
    return updatedUser[0];
  } catch (error) {
    throw new Error("Error while updating age: " + error.message);
  }
};

const createNewDiet = async (name, description, user_id) => {
  const sql = `INSERT INTO diets (name, description, user_id) VALUES ($1, $2, $3) RETURNING *`;
  try {
    const { rows: newDiet } = await pool.query(sql, [
      name,
      description,
      user_id,
    ]);
    return newDiet[0];
  } catch (error) {
    throw new Error("Error while creating a new Diet " + error.message);
  }
};

const getAllDiets = async (user_id) => {
  const sql = `SELECT * FROM diets WHERE user_id = $1`;
  try {
    const { rows: diets } = await pool.query(sql, [user_id]);
    return diets;
  } catch (error) {
    throw new Error("Error while retriving all user's Diets " + error.message);
  }
};

const eraseDiet = async (diet_id) => {
  const sql = `DELETE FROM diets WHERE id = $1`;
  try {
    const result = await pool.query(sql, [diet_id]);
    if (result.rowCount === 0) {
      throw new Error("No diet found with the given ID.");
    }
    return { success: true, message: "Diet deleted successfully." };
  } catch (error) {
    throw new Error("Error while deleting this Diet " + error.message);
  }
};

const alterDiet = async (
  diet_id,
  name,
  description,
  protein,
  carbs,
  fat,
  calories
) => {
  const sql = `UPDATE diets SET name = $1, description = $2, protein = $3, carbs = $4, fat = $5, calories = $6 WHERE id = $7 RETURNING *`;
  try {
    const { rows: updatedDiet } = await pool.query(sql, [
      name,
      description,
      protein,
      carbs,
      fat,
      calories,
      diet_id,
    ]);
    return updatedDiet[0];
  } catch (error) {
    throw new Error("Error while altering this Diet " + error.message);
  }
};

const createNewMeal = async (name, diet_id) => {
  const sql = `INSERT INTO meals (name, diet_id) VALUES ($1, $2) RETURNING *`;
  try {
    const { rows: newMeal } = await pool.query(sql, [name, diet_id]);
    return newMeal[0];
  } catch (error) {
    throw new Error("Error while creating a new meal: " + error.message);
  }
};

const getAllMealsByDiet = async (diet_id) => {
  const sql = `SELECT * FROM meals WHERE diet_id = $1`;
  try {
    const { rows: meals } = await pool.query(sql, [diet_id]);
    return meals;
  } catch (error) {
    throw new Error("Error while retrieving meals: " + error.message);
  }
};

const eraseMeal = async (meals_id) => {
  const sql = `DELETE FROM meals WHERE id = $1`;
  try {
    const result = await pool.query(sql, [meals_id]);
    if (result.rowCount === 0) {
      throw new Error("No meal found with the given ID.");
    }
    return { success: true, message: "Meal deleted successfully." };
  } catch (error) {
    throw new Error("Error while deleting this meal: " + error.message);
  }
};

const alterMeal = async (meals_id, name, protein, carbs, fat, calories) => {
  const sql = `UPDATE meals SET name = $1, protein = $2, carbs = $3, fat = $4, calories = $5 WHERE id = $6 RETURNING *`;
  try {
    const { rows: updatedMeal } = await pool.query(sql, [
      name,
      protein,
      carbs,
      fat,
      calories,
      meals_id,
    ]);
    return updatedMeal[0];
  } catch (error) {
    throw new Error("Error while updating this meal: " + error.message);
  }
};

const createNewFood = async (name, amount, protein, carbs, fat, meals_id) => {
  const sql = `INSERT INTO food (name, amount, protein, carbs, fat, meals_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  try {
    const { rows: newFood } = await pool.query(sql, [
      name,
      amount,
      protein,
      carbs,
      fat,
      meals_id,
    ]);
    return newFood[0];
  } catch (error) {
    throw new Error("Error while creating new food: " + error.message);
  }
};

const getAllFoodByMeal = async (meals_id) => {
  const sql = `SELECT * FROM food WHERE meals_id = $1`;
  try {
    const { rows: foodItems } = await pool.query(sql, [meals_id]);
    return foodItems;
  } catch (error) {
    throw new Error("Error while retrieving food items: " + error.message);
  }
};

const eraseFood = async (food_id) => {
  const sql = `DELETE FROM food WHERE id = $1`;
  try {
    const result = await pool.query(sql, [food_id]);
    if (result.rowCount === 0) {
      throw new Error("No food item found with the given ID.");
    }
    return { success: true, message: "Food item deleted successfully." };
  } catch (error) {
    throw new Error("Error while deleting this food item: " + error.message);
  }
};

const alterFood = async (food_id, name, amount, protein, carbs, fat) => {
  const sql = `UPDATE food SET name = $1, amount = $2, protein = $3, carbs = $4, fat = $5 WHERE id = $6 RETURNING *`;
  try {
    const { rows: updatedFood } = await pool.query(sql, [
      name,
      amount,
      protein,
      carbs,
      fat,
      food_id,
    ]);
    return updatedFood[0];
  } catch (error) {
    throw new Error("Error while updating this food item: " + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUserNameExists,
  alterUserName,
  alterPassword,
  alterWeight,
  alterHeight,
  alterAge,
  createNewDiet,
  getAllDiets,
  eraseDiet,
  alterDiet,
  createNewMeal,
  getAllMealsByDiet,
  eraseMeal,
  alterMeal,
  createNewFood,
  getAllFoodByMeal,
  eraseFood,
  alterFood,
};
