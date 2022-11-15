const { body, check } = require("express-validator");

const validateBody = [
  body("foo").isString().trim().escape(),
  body("bar").optional().isString().trim().escape(),
  check("baz.*.lang").optional().isString().trim().escape()
];
exports.validateBody = validateBody;
