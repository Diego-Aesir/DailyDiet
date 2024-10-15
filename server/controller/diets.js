const db = require("../db/query");

const dietsController = {
  getDiets: async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res
        .status(400)
        .json({ error: true, message: "User id is required." });
    }

    try {
      const diets = await db.getAllDiets(user_id);
      return res.status(200).json({ diets });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while retrieving diets " });
    }
  },

  postDiet: async (req, res) => {
    const { name, description, user_id } = req.body;

    if (!user_id || !name || !description) {
      return res.status(400).json({
        error: true,
        message: "User id, name and description are required.",
      });
    }

    try {
      const newDiet = await db.createNewDiet(name, description, user_id);
      return res.status(201).json({ newDiet });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while creating new diet " });
    }
  },

  putDiet: async (req, res) => {
    const { diet_id, name, description } = req.body;

    if (!diet_id || !name || !description) {
      return res.status(400).json({
        error: true,
        message: "Diet id, name and description are required.",
      });
    }

    try {
      const meals = await db.getAllMealsByDiet(diet_id);
      const protein = getProteinValues(meals);
      const carbs = getCarbsValues(meals);
      const fat = getFatValues(meals);
      const calories = calculateCalories(protein, carbs, fat);

      const updatedDiet = await db.alterDiet(
        diet_id,
        name,
        description,
        protein,
        carbs,
        fat,
        calories
      );
      return res.status(200).json({ updatedDiet });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while updating diet " });
    }
  },

  deleteDiet: async (req, res) => {
    const { diet_id } = req.body;

    if (!diet_id) {
      return res
        .status(400)
        .json({ error: true, message: "Diet id is required." });
    }

    try {
      const deletedMessage = await db.eraseDiet(diet_id);
      return res.status(200).json({ deletedMessage });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while deleting diet " });
    }
  },
};

function getProteinValues(meals) {
  return meals.reduce((total, meal) => total + meal.protein, 0);
}

function getCarbsValues(meals) {
  return meals.reduce((total, meal) => total + meal.carbs, 0);
}

function getFatValues(meals) {
  return meals.reduce((total, meal) => total + meal.fat, 0);
}

function calculateCalories(protein, carbs, fat) {
  return protein * 4 + carbs * 4 + fat * 9;
}

module.exports = dietsController;
