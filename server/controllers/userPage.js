const db = require("../db/query");

const userPage = {
  getUserInfo: async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: "User id is required." });
    }

    try {
      const userInfo = await db.getUser(id);
      return res.status(200).json(userInfo);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserName: async (req, res) => {
    const id = req.params.id;
    const { newUsername } = req.body;

    if (!id || !newUsername) {
      return res.status(400).json({
        error: true,
        message: "User id and new username are required.",
      });
    }

    try {
      const alteredUser = await db.alterUserName(id, newUsername);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserPassword: async (req, res) => {
    const id = req.params.id;
    const { newPassword } = req.body;

    if (!id || !newPassword) {
      return res.status(400).json({
        error: true,
        message: "User id and new password are required.",
      });
    }

    try {
      const alteredUser = await db.alterPassword(id, newPassword);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserWeight: async (req, res) => {
    const id = req.params.id;
    const { newWeight } = req.body;

    if (!id || !newWeight) {
      return res
        .status(400)
        .json({ error: true, message: "User id and new weight are required." });
    }

    try {
      const alteredUser = await db.alterWeight(id, newWeight);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserHeight: async (req, res) => {
    const id = req.params.id;
    const { newHeight } = req.body;

    if (!id || !newHeight) {
      return res
        .status(400)
        .json({ error: true, message: "User id and new height are required." });
    }

    try {
      const alteredUser = await db.alterHeight(id, newHeight);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserAge: async (req, res) => {
    const id = req.params.id;
    const { newAge } = req.body;

    if (!id || !newAge) {
      return res
        .status(400)
        .json({ error: true, message: "User id and new age are required." });
    }

    try {
      const alteredUser = await db.alterAge(id, newAge);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: "User id is required." });
    }

    try {
      const response = await db.eraseUser(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },
};

module.exports = userPage;
