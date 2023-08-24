const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  // console.log(req.query);
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", " email subscription ");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getById = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    // return res.status(404).json({
    //   message: "Not found",
    // });
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  // console.log(req.user);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found id");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  const empty = req._body;

  if (!empty) {
    next(HttpError(400, "missing field favorite"));
  }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found id");
  }
  // res.json(result);
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
