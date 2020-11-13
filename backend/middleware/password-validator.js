const passwordValidator = require("password-validator");
const validPassword = new passwordValidator();

validPassword
  .is()
  .min(10)
  .max(30)
  .has()
  .uppercase()
  .lowercase()
  .symbols()
  .digits();

module.exports = validPassword;