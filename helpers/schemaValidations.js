const Joi = require('joi');

const newsSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    newsLink: Joi.string().required(),
    imageUrl: Joi.string()
})

const expensesSchema = Joi.object({
    amount: Joi.number().required(),
    email: Joi.string().required(),
    note: Joi.string().required(),
    date: Joi.date().required(),
    category: Joi.string().required(),
})

const userSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required(),
    role: Joi.string()
})


module.exports = {
    newsSchema,
    userSchema
}
