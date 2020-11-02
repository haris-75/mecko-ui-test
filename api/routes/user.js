const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);
router.get("/verify/:validationToken", UserController.verify_user);
router.post("/login", UserController.user_login);
router.post("/forgot-password", UserController.forgot_password);
router.get("/getEmailByPasswordResetToken/:pswdResetToken", UserController.getEmailFromResetToken);
router.post("/newPassword", UserController.reset_password);

module.exports = router;