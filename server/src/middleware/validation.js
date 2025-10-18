const Joi = require('joi');

exports.validateStake = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

exports.validateTransfer = (req, res, next) => {
  const schema = Joi.object({
    toAddress: Joi.string().required(),
    amount: Joi.number().positive().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

