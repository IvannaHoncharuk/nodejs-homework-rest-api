const { v4: uuid } = require('uuid');
const { signup, verificationEmail, getVerificationToken, login, logout } = require('../services/authService');

const {
    conflictError,
    unauthorizedError,
    loginAuthError,
    notFoundError,
    verificationPassedError,
} = require('../helpers/errors');

const { sendEmail } = require('../helpers/sendEmail');

const signupController = async (req, res) => {
    const { email, password, subscription = 'starter' } = req.body;

    const verificationToken = uuid();

    const newUser = await signup(email, password, subscription, verificationToken);

    if (!newUser) throw conflictError;

    
    const url = `http://localhost:3000/api/users/verify/${verificationToken}`;

    const confirmationEmail = {
        to: email,
        subject: 'Confirm your email',
        text: `Follow the link ${url} to verify your email.`,
        html: `<p>Follow the <a target="_blanc" rel="noopener noreferrer"b href=${url}>link</a> to verify your email.</p>`,
    };

    await sendEmail(confirmationEmail);

    res.status(201).json({ user: { email, subscription } });
};

const verificationEmailController = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await verificationEmail(verificationToken);

    if (!user) throw notFoundError;

    res.json({ message: 'Verification successful' });
};

const resendEmailController = async (req, res) => {
    const { email } = req.body;

    const verificationToken = await getVerificationToken(email);

    if (!verificationToken) throw verificationPassedError;

    const url = `http://localhost:3000/api/users/verify/${verificationToken}`;

    const confirmationEmail = {
        to: email,
        subject: 'Confirm your email',
        text: `Follow the link ${url} to verify your email.`,
        html: `<p>Follow the <a target="_blanc" rel="noopener noreferrer"b href=${url}>link</a> to verify your email.</p>`,
    };

    await sendEmail(confirmationEmail);

    res.json({ message: 'Verification email sent' });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const loginData = await login(email, password);

    if (!loginData) throw loginAuthError;

    const { token, subscription } = loginData;

    if (!token) throw loginAuthError;

    res.json({ token, user: { email, subscription } });
};

const logoutController = async (req, res) => {
    const { _id: userId } = req.user;

    const result = await logout(userId);

    if (!result) throw unauthorizedError;

    res.status(204).json();
};

module.exports = { signupController, verificationEmailController, resendEmailController, loginController, logoutController };