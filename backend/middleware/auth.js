require("dotenv").config();
const jwt = require("jsonwebtoken");

//jwt token verification
const verifyToken = (req, res, next) => {
  const cookiesList = req.headers.cookie
    ? req.headers.cookie.split("; ")
    : null;
  const authTokenCookie = cookiesList
    ? cookiesList.find((cookie) => {
        return cookie.startsWith("token");
      })
    : null;

  const authToken = authTokenCookie ? authTokenCookie.split("=")[1] : null;

  if (!authToken) {
    req.isAuthenticated = false;
    req.userId = null;
    return next();
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      req.isAuthenticated = false;
      req.userId = null;
      return res.status(401).send("Invalid token");
    }

    req.isAuthenticated = true;
    req.userId = decodedToken.matchedUser._id;
    next();
  });
};

module.exports = verifyToken;
