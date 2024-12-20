const db = require("../db/query");
const path = require('path');

const mealsController = {
  getMeals: async (req, res) => {
    const diet = req.params.diet;

    if (!diet) {
      return res
        .status(400)
        .json({ error: true, message: "Diet id is required." });
    }

    try {
      const allMeals = await db.getAllMealsByDiet(diet);
      return res.status(200).json({ allMeals });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error retrieving meals: " + error.message,
      });
    }
  },

  downloadTaco: async (req, res) => {
    const file = path.join(__dirname, '../files', 'Tabela TACO.pdf');
    res.download(file, (error) => {
      if (error) {
          res.status(500).json({
            error:true,
            message: "Couldn\'t donwload file " + error.message,
          });
      }});
  },

  postMeals: async (req, res) => {
    const diet = req.params.diet;
    const { name } = req.body;

    if (!diet || !name) {
      return res
        .status(400)
        .json({ error: true, message: "Diet id and Meals Name are required." });
    }

    try {
      const newMeal = await db.createNewMeal(name, diet);
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
      const alteredMeals = await db.putMeal(meals_id, name);
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
        stack: error.stack,
      });
    }
  },
};

module.exports = mealsController;
