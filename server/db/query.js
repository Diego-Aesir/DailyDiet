const { Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {
  calculateCalories,
  sumProtein,
  sumCarbs,
  sumFat,
  decreaseProtein,
  decreaseCarbs,
  decreaseFat,
} = require("../businessLogic/nutrientUtils");

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

const getUser = async (user_id) => {
  const sql = `SELECT * FROM users WHERE id = $1`;
  try {
    const { rows: user } = await pool.query(sql, [user_id]);
    return user[0];
  } catch (error) {
    throw new Error("Couldn't find this user");
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

const eraseUser = async (user_id) => {
  const sql = `DELETE FROM users WHERE id = $1`;
  try {
    const result = await pool.query(sql, [user_id]);
    if (result.rowCount === 0) {
      throw new Error("No user found with the given ID.");
    }
    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    throw new Error("Error while deleting user " + error.message);
  }
};

const createNewDiet = async (name, description, user_id) => {
  const sql = `INSERT INTO diets (name, description, protein, carbs, fat, calories, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  try {
    const { rows: newDiet } = await pool.query(sql, [
      name,
      description,
      0.0,
      0.0,
      0.0,
      0.0,
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

const getDietById = async (diet_id) => {
  const sql = `SELECT * FROM diets WHERE id = $1`;
  try {
    const { rows: diet } = await pool.query(sql, [diet_id]);
    return diet[0];
  } catch (error) {
    throw new Error("Error while searching for this Meal id: " + error.message);
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

const putDiet = async (diet_id, name, description) => {
  const sql = `UPDATE diets SET name = $1, description = $2 WHERE id = $3`;
  try {
    await pool.query(sql, [name, description, diet_id]);
    return { success: true, message: "Meal updated successfully." };
  } catch (error) {
    throw new Error("Error while altering this Diet " + error.message);
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
  const sql = `INSERT INTO meals (name, protein, carbs, fat, calories, diet_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  try {
    const { rows: newMeal } = await pool.query(sql, [
      name,
      0.0,
      0.0,
      0.0,
      0.0,
      diet_id,
    ]);
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

const getMealById = async (meal_id) => {
  const sql = `SELECT * FROM meals WHERE id = $1`;
  try {
    const { rows: meal } = await pool.query(sql, [meal_id]);
    return meal[0];
  } catch (error) {
    throw new Error("Error while searching for this Meal id: " + error.message);
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

const putMeal = async (meals_id, name) => {
  const sql = `UPDATE meals SET name = $1 WHERE id = $2`;
  try {
    await pool.query(sql, [name, meals_id]);
    return { success: true, message: "Meal updated successfully." };
  } catch (error) {
    throw new Error("Error while updating this meal: " + error.message);
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
    await addMealValuesByFood(newFood[0]);
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

const getFoodById = async (food_id) => {
  const sql = `SELECT * FROM food WHERE id = $1`;
  try {
    const { rows: food } = await pool.query(sql, [food_id]);
    return food[0];
  } catch (error) {
    throw new Error("Error while searching for this food id: " + error.message);
  }
};

const eraseFood = async (food_id) => {
  const food = getFoodById(food_id);
  const sql = `DELETE FROM food WHERE id = $1`;
  try {
    const result = await pool.query(sql, [food_id]);
    if (result.rowCount === 0) {
      throw new Error("No food item found with the given ID.");
    }
    await deleteMealValuesByFood(food);
    return { success: true, message: "Food item deleted successfully." };
  } catch (error) {
    throw new Error("Error while deleting this food item: " + error.message);
  }
};

const alterFood = async (food_id, name, amount, protein, carbs, fat) => {
  const sql = `UPDATE food SET name = $1, amount = $2, protein = $3, carbs = $4, fat = $5 WHERE id = $6 RETURNING *`;
  try {
    const actualFood = await getFoodById(food_id);
    deleteMealValuesByFood(actualFood);
    const { rows: updatedFood } = await pool.query(sql, [
      name,
      amount,
      protein,
      carbs,
      fat,
      food_id,
    ]);
    await addMealValuesByFood(updatedFood[0]);
    return updatedFood[0];
  } catch (error) {
    throw new Error("Error while updating this food item: " + error.message);
  }
};

const addMealValuesByFood = async (food) => {
  try {
    const meal = await getMealById(food.meals_id);

    const protein = sumProtein(meal.protein, food.protein);
    const carbs = sumCarbs(meal.carbs, food.carbs);
    const fat = sumFat(meal.fat, food.fat);

    const calories = calculateCalories(protein, carbs, fat);

    await alterMeal(meal.id, meal.name, protein, carbs, fat, calories);
    await addDietValuesByMeal(meal.diet_id, protein, carbs, fat);
  } catch (error) {
    throw new Error("Error while updating this Meal values: " + error.message);
  }
};

const addDietValuesByMeal = async (
  diet_id,
  meals_protein,
  meal_carbs,
  meal_fat
) => {
  try {
    const diet = await getDietById(diet_id);

    const protein = sumProtein(diet.protein, meals_protein);
    const carbs = sumCarbs(diet.carbs, meal_carbs);
    const fat = sumFat(diet.fat, meal_fat);
    const calories = calculateCalories(protein, carbs, fat);

    await alterDiet(
      diet.id,
      diet.name,
      diet.description,
      protein,
      carbs,
      fat,
      calories
    );
  } catch (error) {
    throw new Error("Error while updating this Diet values: " + error.message);
  }
};

const deleteMealValuesByFood = async (food) => {
  try {
    const meal = await getMealById(food.meals_id);

    const protein = decreaseProtein(meal.protein, food.protein);
    const carbs = decreaseCarbs(meal.carbs, food.carbs);
    const fat = decreaseFat(meal.fat, food.fat);

    const calories = calculateCalories(protein, carbs, fat);

    await alterMeal(meal.id, meal.name, protein, carbs, fat, calories);
    await deleteDietValuesByMeal(meal.diet_id, protein, carbs, fat);
  } catch (error) {
    throw new Error("Error while deleting this Meal values: " + error.message);
  }
};

const deleteDietValuesByMeal = async (
  diet_id,
  meals_protein,
  meal_carbs,
  meal_fat
) => {
  try {
    const diet = await getDietById(diet_id);

    const protein = decreaseProtein(diet.protein, meals_protein);
    const carbs = decreaseCarbs(diet.carbs, meal_carbs);
    const fat = decreaseFat(diet.fat, meal_fat);

    const calories = calculateCalories(protein, carbs, fat);

    await alterDiet(
      diet.id,
      diet.name,
      diet.description,
      protein,
      carbs,
      fat,
      calories
    );
  } catch (error) {
    throw new Error("Error while deleting this Diet values: " + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUserNameExists,
  getUser,
  alterUserName,
  alterPassword,
  alterWeight,
  alterHeight,
  alterAge,
  eraseUser,
  createNewDiet,
  getAllDiets,
  eraseDiet,
  putDiet,
  alterDiet,
  createNewMeal,
  getAllMealsByDiet,
  eraseMeal,
  putMeal,
  alterMeal,
  createNewFood,
  getAllFoodByMeal,
  eraseFood,
  alterFood,
};
