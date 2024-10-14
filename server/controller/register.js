const db = require("../db/query");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const generateToken = require("../token/tokenGenerator");

const register = async (req, res) => {
  const { username, password, weight, height, age } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const fieldsError = validationResult(req);
  if (!fieldsError.isEmpty()) {
    return res.status(400).json({ message: fieldsError.array() });
  }

  try {
    const registered = await db.registerUser(
      username,
      password,
      weight,
      height,
      age
    );

    const secret = generateToken(username, password, Date.now().toString());
    if (registered) {
      const token = jwt.sign({ id: registered.id }, secret, {
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
