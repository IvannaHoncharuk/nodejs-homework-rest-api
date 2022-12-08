const { model } = require('mongoose');

const contactSchema = require('../schemas/dbContactsSchema');

const Contact = model('contact', contactSchema);

module.exports = Contact;