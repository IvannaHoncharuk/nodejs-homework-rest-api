const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const signup = async (email, password, subscription) => {
    if (await User.findOne({ email })) return null;

    const newUser = new User({ email, password, subscription });
    await newUser.hashPassword(password);
    newUser.save();

    return newUser;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return null;

    const { _id, createdAt, subscription = 'starter' } = user;

    const token = jwt.sign({ _id, createdAt }, JWT_SECRET);

    await User.findByIdAndUpdate(_id, { token });

    return { token, subscription };
};

const logout = async userId => {
    const user = await User.findByIdAndUpdate(userId, { token: null });

    if (!user) return null;

    return user;
};

module.exports = { signup, login, logout };