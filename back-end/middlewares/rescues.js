exports.invalidLogin = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'SequelizeEmailNotFound' || err.message === 'SequelizePasswordIncorret')
      return res.status(400).json({ message: 'Invalid Fields' });

    return res.status(500).json({ error: err.name });
  }
};

exports.databaseErrorHandling = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

exports.errorReadingJWT = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(422).json({ message: 'Unprocessable Entity', error: err.message });
  }
};
