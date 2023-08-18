const HttpError = require("../helpers/HttpError");

const validateFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const empty = req._body;

    if (!empty) {
      next(HttpError(400, "missing field favorite"));
    }
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateFavorite;
