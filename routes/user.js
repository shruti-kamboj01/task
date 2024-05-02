const express = require("express")
const router = express.Router()

const {
    registration,
    login,
} = require("../controller/auth")

const {resetPasswordToken, resetPassword} = require("../controller/resetPassword")



router.post("/login", login)
router.post("/signup", registration)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

module.exports = router