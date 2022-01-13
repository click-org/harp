const { getAuth } = require("firebase-admin/auth");

module.exports.verifyToken = async (req, res, next) => {
  try {
    await getAuth().verifyIdToken(req.headers.auth_token);
    next();
  } catch (error) {
    return next(new Error("invalid token"));
  }
};
