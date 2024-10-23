const db = require("../db/query");

const dietsController = {
  getAllDiets: async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: "User id is required." });
    }

    try {
      const diets = await db.getAllDiets(id);
      return res.status(200).json({ diets });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while retrieving diets " });
    }
  },

  postDiet: async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    if (!id || !name || !description) {
      return res.status(400).json({
        error: true,
        message: "User id, name and description are required.",
      });
    }

    try {
      const newDiet = await db.createNewDiet(name, description, id);
      return res.status(201).json({ newDiet });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while creating new diet " });
    }
  },

  putDiet: async (req, res) => {
    const diet = req.params.diet;
    const { name, description } = req.body;

    if (!diet || !name || !description) {
      return res.status(400).json({
        error: true,
        message: "Diet id, name and description are required.",
      });
    }

    try {
      const updatedDiet = await db.putDiet(diet, name, description);
      return res.status(200).json({ updatedDiet });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while updating diet " });
    }
  },

  deleteDiet: async (req, res) => {
    console.log('Tentei');
    const diet = req.params.diet;

    if (!diet) {
      return res
        .status(400)
        .json({ error: true, message: "Diet id is required." });
    }

    try {
      const deletedMessage = await db.eraseDiet(diet);
      return res.status(200).json({ deletedMessage });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Error while deleting diet " });
    }
  },
};

module.exports = dietsController;
