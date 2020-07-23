const connection = require('./service');
const { ObjectID } = require('mongodb');

class Chat {
  async static createOne({ userClient, admin, message }) {
    try {
      const { idClient, email } = userClient;
      const { content } = message;
      const db = await connection();
      return await db.collection('Chat').insertOne(
        {
          "idClient": Number(idClient),
          "email": email,
          "messages": [{ content: content, hour: new Date(), admin: admin }]
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async static addMessageToChat({ userClient, admin, message }) {
    try {
      const { idClient } = userClient;
      const { content } = message;
      const db = await connection();
      return await db.collection('Chat').findOneAndUpdate(
        {
          "idClient": Number(idClient),
        },
        {
          $push: {
            messages: {
              content: content,
              hour: new Date(),
              admin: admin,
            }
          },
        },
        {
          upsert: true,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  async static getAllChat() {
    try {
      const db = await connection();
      const data = await db.collection('Chat').find().toArray();
      if (!data) {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Nada encontrado`;
        throw notFoundError;
      }
      return data;
    } catch (err) {
      throw err;
    }
  }

  async static getOneChatByIdClient(idClient) {
    try {
      const db = await connection();
      const data = await db.collection('Chat').findOne({
        "idClient": Number(idClient),
      });
      console.log(data, 'data - line 72')
      if (!data) return [];
      return data;
    } catch (err) {
      throw err;
    }
  }

  async static getOneChatById(id) {
    try {
      const db = await connection();
      const data = await db.collection('Chat').findOne({
        _id: ObjectID(id),
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Chat;
