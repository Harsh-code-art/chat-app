const express = require('express')
const { Register, Login, userlogout } = require('../controller/UserAuth')
router = express.Router()
router.post("/create",Register)
router.post("/login",Login)
router.post("/logout",userlogout)

module.exports = router