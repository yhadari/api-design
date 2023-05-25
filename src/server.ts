import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { hashPassword, protect } from "./modules/auth";

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

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});

// app.post("/login", (req, res) => {
//   const token = login(req.body);
//   res.status(200);
//   res.json({ message: "User loged", token });
// });

// app.post("/signup", (req, res) => {
//   hashPassword(req.body.password);
//   res.status(201);
//   res.json({ message: "User created" });
// });

app.get("/html", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("pages/index.html"));
});

app.use("/api/v1", protect, router);

export default app;
