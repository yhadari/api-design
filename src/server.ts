import express from "express";
import path from "path";
const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});
app.get("/html", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("pages/index.html"));
});

export default app;
