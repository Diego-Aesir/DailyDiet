const db = require("../db/query");

const mealsController = {
  getMeals: async (req, res) => {
    const { diet_id } = req.query;

    if (!diet_id) {
      return res
        .status(400)
        .json({ error: true, message: "Diet id is required." });
    }

    try {
      const allMeals = await db.getAllMealsByDiet(diet_id);
      return res.status(200).json({ allMeals });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error retrieving meals: " + error.message,
      });
    }
  },

  postMeals: async (req, res) => {
    const { name, diet_id } = req.body;

    if (!diet_id || !name) {
      return res
        .status(400)
        .json({ error: true, message: "Diet id and Meals Name are required." });
    }

    try {
      const newMeal = await db.createNewMeal(name, diet_id);
      return res.status(201).json({ newMeal });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error creating meal: " + error.message,
      });
    }
  },

  putMeals: async (req, res) => {
    const { meals_id, name } = req.body;

    if (!meals_id || !name) {
      return res
        .status(400)
        .json({ error: true, message: "Meals id and name are required." });
    }

    try {
      const allFoods = await db.getAllFoodByMeal(meals_id);
      const protein = getProtein(allFoods);
      const carbs = getCarbs(allFoods);
      const fat = getFat(allFoods);
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
      return res.status(500).json({
        error: true,
        message: "Error updating meal: " + error.message,
      });
    }
  },

  deleteMeals: async (req, res) => {
    const { meals_id } = req.body;

    if (!meals_id) {
      return res
        .status(400)
        .json({ error: true, message: "Meals id is required." });
    }

    try {
      const response = await db.eraseMeal(meals_id);
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error deleting meal: " + error.message,
      });
    }
  },
};

function getProtein(allFoods) {
  return allFoods.reduce((total, food) => total + food.protein, 0);
}

function getCarbs(allFoods) {
  return allFoods.reduce((total, food) => total + food.carbs, 0);
}

function getFat(allFoods) {
  return allFoods.reduce((total, food) => total + food.fat, 0);
}

function calculateMealCalories(protein, carbs, fat) {
  return protein * 4 + carbs * 4 + fat * 9;
}

module.exports = mealsController;
