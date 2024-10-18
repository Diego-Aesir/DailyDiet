const db = require("../db/query");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = async (req, res) => {
  const { username, password, weight, height, age } = req.body;

  if (!username || !password || !weight || !height || !age) {
    return res
      .status(400)
      .json({ error: true, message: "Username, password, weight, height, age are required." });
  }

  try {
    const registered = await db.registerUser(
      username,
      password,
      weight,
      height,
      age
    );

    if (registered) {
      const token = jwt.sign({ id: registered.id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      return res.status(200).json({ User: registered, Token: token });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while registering user: " + error.message });
  }
};

module.exports = register;
