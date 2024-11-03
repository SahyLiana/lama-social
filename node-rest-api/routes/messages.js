const router = require("express").Router();
const Message = require("../models/Message");

//add
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMsg = await newMessage.save();
    res.status(200).json(savedMsg);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get all messages from a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
