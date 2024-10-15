const db = require("../db/query");
const jwt = require("jsonwebtoken");
const generateToken = require("../token/tokenGenerator");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Username and password are required." });
  }

  try {
    const user_id = await db.loginUser(username, password);

    if (!user_id) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid username or password." });
    }

    const secret = generateToken(username, password, Date.now().toString());
    const token = jwt.sign({ id: user_id }, secret, { expiresIn: "3h" });

    return res.status(200).json({ user_id, token });
  } catch (error) {
    return res.status(401).json({ error: true, message: error.message });
  }
};

module.exports = loginUser;
