const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

// const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailRegexp = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegexp = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const addSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "name should be a type of 'text'",
    "string.empty": "name cannot be an empty field",
    "string.min": `name should have min {#limit} symbols`,
    "any.required": "missing required name field",
  }),
  // .error(new Error("missing required name field")),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "string.base": "email should be a type of 'text'",
      "string.empty": "email cannot be an empty field",
      "string.email": "email must be in format text@text.com or text@text.net",
      "any.required": "missing required email field",
    }),
  // .error(new Error("missing required email field")),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.base": "phone should be a type of 'text'",
    "string.empty": "phone cannot be an empty field",
    "any.required": "missing required phone field",
    "string.pattern.base": "phone must be in format (xxx) xxx-xxxx",
  }),
  // .error(new Error("missing required phone field")),
  favorite: Joi.boolean(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, "Minimal 2 symbols required for Name"],
      required: [true, "Name is required field"],
    },
    email: {
      type: String,
      match: [emailRegexp, "must be in format text@text.domain"],
      required: [true, "Email is required field"],
    },
    phone: {
      type: String,
      match: [phoneRegexp, "must be in format (xxx) xxx-xxxx"],
      required: [true, "Phone is required field"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
