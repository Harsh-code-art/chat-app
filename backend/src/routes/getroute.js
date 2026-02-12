const express = require("express")
const { islogin } = require("../middleware/islogin")
const { getuserbysearch, userchatter } = require("../controller/userhandler")
const router = express.Router()

router.get("/search",islogin,getuserbysearch)
router.get("/chatters",islogin,userchatter)

module.exports = router