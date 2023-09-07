const express = require("express");
const ctrl = require("../../controllers/users");

const { validateBody, authorization, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerShema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailShema),
  ctrl.resendVerifyEmail
);

//signin
router.post("/login", validateBody(schemas.loginShema), ctrl.login);

router.get("/current", authorization, ctrl.getCurrent);

router.post("/logout", authorization, ctrl.logout);

router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
