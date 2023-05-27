import { Router } from "express";
import { body } from "express-validator";
import { validate } from "./modules/middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", (req, res) => {});

router.get("/product/:id", () => {});

router.post("/product", body("name").isString(), validate, (req, res) => {});

router.put("/product/:id", body("name").isString(), validate, (req, res) => {});

router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});

router.get("/update/:id", () => {});

router.post(
  "/update/",
  body("title").isString(),
  body("body").isString(),
  () => {}
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPED", "DEPRECATED"]),
  body("version").optional(),
  () => {}
);

router.delete("/update/:id", () => {});

/**
 * Update Point
 */
router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.post(
  "/updatepoint/",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  () => {}
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);

router.delete("/updatepoint/:id", () => {});

export default router;
