import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.status(201);
  res.json({ message: "User created", token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    res.status(401);
    res.json({ message: "Invalid credentials" });
    return;
  }
  const valid = comparePasswords(req.body.password, user?.password);
  if (!valid) {
    res.status(401);
    res.json({ message: "Invalid credentials" });
    return;
  }
  const token = createJWT(user);
  res.status(200);
  res.json({ message: "User logged in", token });
};
