const db = require("../db/query");

const foodController = {
  getFood: async (req, res) => {
    const { meals_id } = req.body;
    try {
      const allFoods = await db.getAllFoodByMeal(meals_id);
      return res.status(200).json({ allFoods });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving food: " + error.message });
    }
  },

  postFood: async (req, res) => {
    const { name, amount, protein, carbs, fat, meals_id } = req.body;
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
      return res
        .status(500)
        .json({ message: "Error creating food: " + error.message });
    }
  },

  putFood: async (req, res) => {
    const { food_id, name, amount, protein, carbs, fat } = req.body;
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
      return res
        .status(500)
        .json({ message: "Error updating food: " + error.message });
    }
  },

  deleteFood: async (req, res) => {
    const { food_id } = req.body;
    try {
      const response = await db.eraseFood(food_id);
      return res.status(200).json({ response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting food: " + error.message });
    }
  },
};

module.exports = foodController;
