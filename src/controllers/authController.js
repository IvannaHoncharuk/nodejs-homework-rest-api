const { signup, login, logout } = require('../services/authService');

const {
    conflictError,
    unauthorizedError,
    loginAuthError,
} = require('../helpers/errors');

const signupController = async (req, res) => {
    const { email, password, subscription = 'starter' } = req.body;

    const newUser = await signup(email, password, subscription);

    if (!newUser) throw conflictError;

    res.status(201).json({ user: { email, subscription } });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const { token, subscription } = await login(email, password);

    if (!token) throw loginAuthError;

    res.json({ token, user: { email, subscription } });
};

const logoutController = async (req, res) => {
    const { _id: userId } = req.user;

    const result = await logout(userId);

    if (!result) throw unauthorizedError;

    res.status(204).json();
};

module.exports = { signupController, loginController, logoutController };