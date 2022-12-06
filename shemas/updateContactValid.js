const Joi = require('joi');

const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2 }).optional(),
    phone: Joi.string().min(9).max(15).optional(),
}).min(1);

module.exports = { updateContactSchema };