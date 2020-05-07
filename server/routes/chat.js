const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");
const { auth } = require("../middleware/auth");


//=================================
//             Chat
//=================================

router.get("/getChats", auth, async (req, res) => {
  if(!req.isAuthorized) {
    return res.status(200).json({
      message: 'Not Authorized' 
    });
  }
  console.log('hereee');
  await Chat.find()
  .populate("sender")
  .exec((err, chats) => {
      // console.log(chats)
      if(err) return res.status(400).send(err);
      res.status(200).send(chats)
  })
});

module.exports = router;
