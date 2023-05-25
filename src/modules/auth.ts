import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compareSync(password, hash); // true or fals
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "NOt authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "NOt valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log("error: ", err.message);
    res.status(401);
    res.json({ message: "NOt authorized" });
    return;
  }
};
