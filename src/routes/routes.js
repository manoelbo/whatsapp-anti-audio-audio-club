const express = require('express');
const router = express.Router();
const whatsAppController = require("../controllers/whatsappControllers");

router
.get("/", whatsAppController.VerfiToken)
.post("/", whatsAppController.ReceivedMessage)

module.exports = router;