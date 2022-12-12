const jwt = require('jsonwebtoken');
const User = require('../models/user');
const gravatar = require('gravatar');

const { JWT_SECRET } = process.env;

const signup = async (email, password, subscription, verificationToken) => {
    if (await User.findOne({ email })) return null;

    const avatarURL = gravatar.url(email);

    const newUser = new User({ email, password, subscription, avatarURL, verificationToken });
    await newUser.hashPassword(password);
    newUser.save();

    return newUser;
};

const verificationEmail = async verificationToken => {
    const user = await User.findOne({ verificationToken });

    if (!user || user.verify) return null;

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    });

    return user;
};

const getVerificationToken = async email => {
    const user = await User.findOne({ email });

    if (user.verify) return null;

    return user.verificationToken;
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

module.exports = { signup, verificationEmail, getVerificationToken, login, logout };