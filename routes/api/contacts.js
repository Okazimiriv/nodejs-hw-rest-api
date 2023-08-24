const express = require("express");

const ctrl = require("../../controllers/ctrlContacts");

const {
  validateBody,
  isValidId,
  validateFavorite,
  authorization,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authorization, ctrl.getAll);

router.get("/:id", authorization, isValidId, ctrl.getById);

router.post("/", authorization, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  authorization,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authorization,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", authorization, isValidId, ctrl.deleteById);

module.exports = router;
