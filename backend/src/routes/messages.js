const exporess = require("express")
const { sendmessage, getmessage } = require("../controller/messagecontroller")
const { islogin } = require("../middleware/islogin")
const router = exporess.Router()

router.post('/send/:id',islogin,sendmessage)
router.get('/:id',islogin,getmessage)

module.exports =router