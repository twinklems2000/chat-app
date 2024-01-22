const Message = require('../models/messageModel');

module.exports.addMessage = async (req, res) => {
  try {
    const { from, message, to } = req.body;
    let result = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (result) {
      res.send({ msg: 'Message sent sucessfully' });
    } else {
      res.send({ errors: [{ msg: 'error adding message to database' }] });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;

    const message = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updated: 1 });

    const projectedMessages = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.send({ data: projectedMessages });
  } catch (error) {
    res.send(error);
  }
};
