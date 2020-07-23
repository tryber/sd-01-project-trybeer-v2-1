const Chat = require('../model/chat');

const returnMessage = async (data) => {
  const id = (!data.lastErrorObject.updatedExisting)
    ? data.lastErrorObject.upserted
    : data.value._id;
  return Chat.getOneChatById(id);
};

exports.addMessageToChat = async ({ userClient, admin, message }) => {
  try {
    const { idClient } = userClient;
    const getChat = await Chat.getOneChatByIdClient(idClient);
    if (getChat.length === 0) {
      const data = await Chat.createOne({ userClient, admin, message });
      return data.ops[0];
    }
    const data = await Chat.addMessageToChat({ userClient, admin, message });
    return returnMessage(data);
  } catch (err) {
    throw err;
  }
};

exports.verifyAndCreate = async ({ userClient, admin }) => {
  try {
    const data = await Chat.createOne({ userClient, admin });
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getAllChat = async (id) => {
  try {
    const data = await Chat.getAllChat(id);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getOneChatByIdClient = async (idClient) => {
  try {
    const data = await Chat.getOneChatByIdClient(idClient);
    return data;
  } catch (err) {
    throw err;
  }
};
