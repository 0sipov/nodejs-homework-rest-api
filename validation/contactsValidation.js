const yup = require("yup");

const createContactSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});
const changeContactSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
});

module.exports = {
  createContactSchema,
  changeContactSchema,
};
