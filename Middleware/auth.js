const jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: No token provided",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      error: "Unauthorized: Invalid token",
    });
  }
}

module.exports = Auth;
