const db = require("../db/query");

const mealsController = {
  getMeals: async (req, res) => {
    const { diet_id } = req.body;
    try {
      const allMeals = await db.getAllMealsByDiet(diet_id);
      return res.status(200).json({ allMeals });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving meals: " + error.message });
    }
  },

  postMeals: async (req, res) => {
    const { name, diet_id } = req.body;
    try {
      const newMeal = await db.createNewMeal(name, diet_id);
      return res.status(201).json({ newMeal });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating meal: " + error.message });
    }
  },

  putMeals: async (req, res) => {
    const { meals_id, name } = req.body;
    try {
      const protein = await getProtein(meals_id);
      const carbs = await getCarbs(meals_id);
      const fat = await getFat(meals_id);
      const calories = calculateMealCalories(protein, carbs, fat);
      const alteredMeals = await db.alterMeal(
        meals_id,
        name,
        protein,
        carbs,
        fat,
        calories
      );
      return res.status(200).json({ alteredMeals });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating meal: " + error.message });
    }
  },

  deleteMeals: async (req, res) => {
    const { meals_id } = req.body;
    try {
      const response = await db.eraseMeal(meals_id);
      return res.status(200).json({ response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting meal: " + error.message });
    }
  },
};

async function getProtein(meals_id) {
  try {
    const allFoods = await db.getAllFoodByMeal(meals_id);
    return allFoods.reduce((total, food) => total + food.protein, 0);
  } catch (error) {
    throw new Error("Error retrieving protein: " + error.message);
  }
}

async function getCarbs(meals_id) {
  try {
    const allFoods = await db.getAllFoodByMeal(meals_id);
    return allFoods.reduce((total, food) => total + food.carbs, 0);
  } catch (error) {
    throw new Error("Error retrieving carbs: " + error.message);
  }
}

async function getFat(meals_id) {
  try {
    const allFoods = await db.getAllFoodByMeal(meals_id);
    return allFoods.reduce((total, food) => total + food.fat, 0);
  } catch (error) {
    throw new Error("Error retrieving fat: " + error.message);
  }
}

async function calculateMealCalories(protein, carbs, fat) {
  return protein * 4 + carbs * 4 + fat * 9;
}

module.exports = mealsController;
