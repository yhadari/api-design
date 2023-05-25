import prisma from "../db";
import { createJWT, hashPassword } from "../modules/auth";

// export const checkUser = async (username: string) => {
//   return await prisma.user.findUnique({
//     where: {
//       username,
//     },
//   });
// };

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
