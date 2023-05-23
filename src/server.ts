import express from "express";
import path from "path";
import router from "./router";

const app = express();

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});
app.get("/html", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("pages/index.html"));
});

export default app;
