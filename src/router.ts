import { Router } from "express";
import { body } from "express-validator";
import { validate } from "./modules/middleware";
import {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";

import {
  getUpdates,
  getOneUpdate,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post("/product", body("name").isString(), validate, createProduct);
router.put("/product/:id", body("name").isString(), validate, updateProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.post(
  "/update/",
  body("title").isString(),
  body("body").isString(),
  body("productId").isString(),
  createUpdate
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.delete("/update/:id", deleteUpdate);

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
