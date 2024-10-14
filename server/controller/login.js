const db = require("../db/querry");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateDynamicSecret = (...args) => {
  const hash = crypto.createHash("sha256");
  args.forEach((arg) => hash.update(arg));
  return hash.digest("hex");
};

const loginUser = async (req, res) => {
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user_id = await db.loginUser(username, password);
    const secret = generateDynamicSecret(
      user_id,
      username,
      password,
      Date.now().toString()
    );
    const token = jwt.sign({ id: user_id }, secret, { expiresIn: "1h" });
    res.status(200).json({ user_id, token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = loginUser;
