import { Router } from "express";
import { body, oneOf } from "express-validator";
import { validate } from "./modules/middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", (req, res) => {
  console.log("user: ", req.user);
  res.json({ message: "Product" });
});

router.get("/product/:id", () => {});

router.post("/product", body("name").isString(), validate, (req, res) => {
  res.json({ message: "Product created" });
});

router.put("/product/:id", body("name").isString(), validate, (req, res) => {
  res.json({ message: "Product updated" });
});

router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});

router.get("/update/:id", () => {});

router.post("/update/", () => {});

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  // oneOf("status", [body("IN_PROGRESS"), body("SHIPED"), body("DEPRECATED")]),
  body("version").optional(),
  () => {}
);

router.delete(
  "/update/:id",
  body("title").exists().isString(),
  body("body").exists().isString(),
  () => {}
);

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post("/updatepoint/", () => {});
router.put("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
