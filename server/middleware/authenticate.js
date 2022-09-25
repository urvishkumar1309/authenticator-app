const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
 console.log("token ",req.body.authorization);
  const authHeader = req.body.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    req.user = { userId:payload.userID,userl:payload.userl };
    next();
  } catch (error) {
    return res.status(401).send("Authentication Invalid");
  }
};

module.exports = authenticate;