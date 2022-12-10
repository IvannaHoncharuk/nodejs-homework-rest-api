const { model } = require('mongoose');

const userSchema = require('../schemas/dbUserSchema');

const User = model('user', userSchema);

module.exports = User;