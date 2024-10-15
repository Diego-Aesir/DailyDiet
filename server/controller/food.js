const db = require("../db/query");

const foodController = {
  getFood: async (req, res) => {
    const { meals_id } = req.query;

    if (!meals_id) {
      return res
        .status(400)
        .json({ error: true, message: "Meals id is required." });
    }

    try {
      const allFoods = await db.getAllFoodByMeal(meals_id);
      return res.status(200).json({ allFoods });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error retrieving food: " + error.message,
      });
    }
  },

  postFood: async (req, res) => {
    const { name, amount, protein, carbs, fat, meals_id } = req.body;

    if (!name || !amount || !protein || !carbs || !fat || !meals_id) {
      return res.status(400).json({
        error: true,
        message: "name, amount, protein, carbs, fat, meals_id  are required.",
      });
    }

    try {
      const newFood = await db.createNewFood(
        name,
        amount,
        protein,
        carbs,
        fat,
        meals_id
      );
      return res.status(201).json({ newFood });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error creating food: " + error.message,
      });
    }
  },

  putFood: async (req, res) => {
    const { food_id, name, amount, protein, carbs, fat } = req.body;

    if (!food_id || !name || !amount || !protein || !carbs || !fat) {
      return res.status(400).json({
        error: true,
        message: "food_id, name, amount, protein, carbs, fat are required.",
      });
    }

    try {
      const alteredFood = await db.alterFood(
        food_id,
        name,
        amount,
        protein,
        carbs,
        fat
      );
      return res.status(200).json({ alteredFood });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error updating food: " + error.message,
      });
    }
  },

  deleteFood: async (req, res) => {
    const { food_id } = req.body;

    if (!food_id) {
      return res.status(400).json({
        error: true,
        message: "Food id is required.",
      });
    }

    try {
      const response = await db.eraseFood(food_id);
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error deleting food: " + error.message,
      });
    }
  },
};

module.exports = foodController;
