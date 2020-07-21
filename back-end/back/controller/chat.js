const Chat = require('../model/chat');

exports.addMessageToChat = async ({ userClient, admin, message }) => {
  try {
    const data = await Chat.addMessageToChat({ userClient, admin, message });
    return await returnMessage(data);
  } catch (err) {
    throw err
  }
};

exports.getAllChat = async (id) => {
  try {
    const data = await Chat.getAllChat(id);
    return data;
  } catch (err) {
    throw err
  }
}

exports.getOneChatByIdClient = async (idClient) => {
  try {
    const data = await Chat.getOneChatByIdClient(idClient);
    return data;
  } catch (err) {
    throw err
  }
}

const returnMessage = async (data) => {
  const id = (!data.lastErrorObject.updatedExisting)
    ? data.lastErrorObject.upserted
    : data.value._id;
  return await Chat.getOneChatById(id);
}
