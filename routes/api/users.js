const express = require("express");
const ctrl = require("../../controllers/users");

const { validateBody, authorization } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerShema), ctrl.register);
//signin
router.post("/login", validateBody(schemas.loginShema), ctrl.login);

router.get("/current", authorization, ctrl.getCurrent);

router.post("/logout", authorization, ctrl.logout);

module.exports = router;
