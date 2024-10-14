const db = require("../db/querry");

const dietsController = {
  getDiets: async (req, res) => {
    const { user_id } = req.body;
    try {
      const diets = await db.getAllDiets(user_id);
      return res.status(200).json({ diets });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error while retrieving diets: " + error.message });
    }
  },

  postDiet: async (req, res) => {
    const { name, description, user_id } = req.body;
    try {
      const newDiet = await db.createNewDiet(name, description, user_id);
      return res.status(201).json({ newDiet });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error while creating new diet: " + error.message });
    }
  },

  putDiet: async (req, res) => {
    const { diet_id, name, description, protein, carbs, fat } = req.body;
    try {
      const updatedDiet = await db.alterDiet(
        diet_id,
        name,
        description,
        protein,
        carbs,
        fat
      );
      return res.status(200).json({ updatedDiet });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error while updating diet: " + error.message });
    }
  },

  deleteDiet: async (req, res) => {
    const { diet_id } = req.body;
    try {
      const deletedMessage = await db.deleteDiet(diet_id);
      return res.status(200).json({ deletedMessage });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error while deleting diet: " + error.message });
    }
  },
};

module.exports = dietsController;
