const connection = require('../services/connection');
const { ObjectID } = require('mongodb');

class Chat {
  static addMessageToChat = async ({ userClient, admin, message }) => {
    try {
      const { idClient, email } = userClient;
      const { content } = message;
      const db = await connection();
      return await db.collection('Chat').findOneAndUpdate(
        {
          "idClient": idClient,
          "email": email,
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

  static getAllChat = async () => {
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

  static getOneChatByIdClient = async (idClient) => {
    try {
      const db = await connection();
      const data = await db.collection('Chat').findOne({
        "idClient": idClient,
      });
      if (!data) return [];
      return data;
    } catch (err) {
      throw err;
    }
  }

  static getOneChatById = async (id) => {
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
