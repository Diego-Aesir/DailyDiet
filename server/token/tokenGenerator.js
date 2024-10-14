const crypto = require("crypto");

const generateToken = (...args) => {
  const hash = crypto.createHash("sha256");
  args.forEach((arg) => hash.update(arg));
  return hash.digest("hex");
};

module.exports = generateToken;