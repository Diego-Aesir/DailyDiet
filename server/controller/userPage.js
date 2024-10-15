const db = require("../db/query");

const userPage = {
  getUserInfo: async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res
        .status(400)
        .json({ error: true, message: "User id is required." });
    }

    try {
      const userInfo = await db.getUser(user_id);
      return res.status(200).json(userInfo);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserName: async (req, res) => {
    const { user_id, newUsername } = req.body;

    if (!user_id || !newUsername) {
      return res.status(400).json({
        error: true,
        message: "User id and new username are required.",
      });
    }

    try {
      const alteredUser = await db.alterUserName(user_id, newUsername);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserPassword: async (req, res) => {
    const { user_id, newPassword } = req.body;

    if (!user_id || !newPassword) {
      return res.status(400).json({
        error: true,
        message: "User id and new password are required.",
      });
    }

    try {
      const alteredUser = await db.alterPassword(user_id, newPassword);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserWeight: async (req, res) => {
    const { user_id, newWeight } = req.body;

    if (!user_id || !newWeight) {
      return res
        .status(400)
        .json({ error: true, message: "User id and new weight are required." });
    }

    try {
      const alteredUser = await db.alterWeight(user_id, newWeight);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserHeight: async (req, res) => {
    const { user_id, newHeight } = req.body;

    if (!user_id || !newHeight) {
      return res
        .status(400)
        .json({ error: true, message: "User id and new height are required." });
    }

    try {
      const alteredUser = await db.alterHeight(user_id, newHeight);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  changeUserAge: async (req, res) => {
    const { user_id, newAge } = req.body;

    if (!user_id || !newAge) {
      return res
        .status(400)
        .json({ error: true, message: "User id and new age are required." });
    }

    try {
      const alteredUser = await db.alterAge(user_id, newAge);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
      return res
        .status(400)
        .json({ error: true, message: "User id is required." });
    }

    try {
      const response = await db.eraseUser(user_id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  },
};
