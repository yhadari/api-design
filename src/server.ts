import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { body } from "express-validator";
import { validate } from "./modules/middleware";

const app = express();

/**
 * Middleware
 */

const customLogger = (message) => (req, res, next) => {
  console.log(`hello from ${message}`);
  next();
};

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger("middleware"));

/**
 * Routes
 */

app.get("/", (req, res, next) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});

app.post(
  "/user",
  body("username").isString(),
  body("password").isString(),
  validate,
  createNewUser
);
app.post("/signin", signin);

app.use("/api/v1", protect, router);

app.use((err, req, res, next) => {
  if (err.type === "auth") res.status(401).json({ message: "unauthorized" });
  else if (err.type === "input")
    res.status(400).json({ message: "invalid input" });
  else res.status(500).json({ message: "oops, thats on us" });
});

export default app;
