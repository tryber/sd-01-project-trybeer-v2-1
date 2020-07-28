const connection = require('./service');
const { ObjectID } = require('mongodb');


exports.createOne = async ({ userClient, admin, message }) => {
  try {
    const { idClient, email } = userClient;
    const { content } = message;
    const db = await connection();
    return await db.collection('Chat').insertOne(
      {
        idClient: Number(idClient),
        email,
        lastUpdate: new Date(),
        messages: [{ content, hour: new Date(), admin }],
      },
    );
  } catch (err) {
    throw err;
  }
};

exports.addMessageToChat = async ({ userClient, admin, message }) => {
  try {
    const { idClient } = userClient;
    const { content } = message;
    const db = await connection();
    return await db.collection('Chat').findOneAndUpdate(
      {
        idClient: Number(idClient),
      },
      {
        $push: {
          messages: {
            content,
            hour: new Date(),
            admin,
          },
        },
        $set: {
          lastUpdate: new Date(),
        },
      },
      {
        upsert: true,
      },
    );
  } catch (err) {
    throw err;
  }
};

exports.getAllChat = async () => {
  try {
    const db = await connection();
    const data = await db.collection('Chat').find().toArray();
    if (!data) {
      const notFoundError = new Error('NotFoundError');
      notFoundError.details = 'Nada encontrado';
      throw notFoundError;
    }
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getOneChatByIdClient = async (idClient) => {
  try {
    const db = await connection();
    const data = await db.collection('Chat').findOne({
      idClient: Number(idClient),
    });
    if (!data) return [];
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getOneChatById = async (id) => {
  try {
    const db = await connection();
    const data = await db.collection('Chat').findOne({
      _id: ObjectID(id),
    });
    return data;
  } catch (err) {
    throw err;
  }
};
