const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const resendEmailSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = { userSchema, subscriptionSchema, resendEmailSchema };