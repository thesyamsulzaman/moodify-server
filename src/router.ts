import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./utils/middleware";
import {
  createInventory,
  getInventoryById,
  getInventories,
  updateInventory,
  deleteInventory,
} from "./handlers/inventory";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Inventory
 */
router.get("/inventory", getInventories);
router.get("/inventory/:id", getInventoryById);
router.put(
  "/inventory/:id",
  body("name").isString(),
  handleInputErrors,
  updateInventory
);
router.post(
  "/inventory",
  body("name").isString(),
  handleInputErrors,
  createInventory
);
router.delete("/inventory/:id", deleteInventory);

/**
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getUpdateById);

const updateIdPutFields = [
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
] as const;

router.put("/update/:id", ...updateIdPutFields, updateUpdate);

const updatePostFields = [
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  //
] as const;
router.post("/update", ...updatePostFields, createUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});

const updatePointIdPutFields = [
  body("name").optional().isString(),
  body("description").optional().isString(),
  //
] as const;
router.put("/updatepoint/:id", ...updatePointIdPutFields, () => {});

const updatePointPostFields = [
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  //
] as const;
router.post("/updatepoint", ...updatePointPostFields, () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
