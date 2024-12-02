const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

// [GET] /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  // SOCKET io
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // console.log(content, userId)
      const record = new Chat({
        user_id: userId,
        content: content,
      });
      await record.save();
    });
  });

  // Lấy data in ra giao diện
  const chats = await Chat.find({ deleted: false });
  // console.log(chats)
  for (const chat of chats) {
    const userId = chat.user_id;
    const user = await User.findOne({
      _id: userId,
    }).select("fullName");
    chat.infoUser = user;
  }

  res.render("client/pages/chat/index.pug", {
    pageTitle: "Chat",
    chats: chats,
  });
};
