const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

const middleware = require('../middlewares/authMiddleware')
const { userValidator: validator } = require('../validator')
const { auth } = require('../module')

/* GET users listing. */
router.get("/", userController.userList);

router.get("/:id", userController.getOneUser);

router.get("/me", middleware.isAuthenticate, userController.getMe)

router.post("/signup", validator.signUp, userController.signup);

router.post('/login', validator.signIn, userController.login)


router.post('/verify-request', middleware.isAuth, middleware.isUnverfied, auth.verifyRequest)
router.post('/verify', validator.verify, auth.verify)
router.post('/reset-password', middleware.isGuest, validator.resetPassword, auth.resetPassword)
router.post('/new-password', middleware.isGuest, validator.newPassword, auth.newPassword)
router.post('/change-password', middleware.isAuth, validator.changePassword, auth.changePassword)
router.post('/update-user', middleware.isAuth, validator.updateUser, auth.updateUser)
router.post('/switch-locale', middleware.isAuth, validator.switchLocale, auth.switchLocale)



module.exports = router;
