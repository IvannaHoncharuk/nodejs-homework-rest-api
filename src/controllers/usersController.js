const { getCurrent, updateSubscription } = require('../services/usersService');

const { unauthorizedError } = require('../helpers/errors');

const getCurrentController = async (req, res) => {
    const { _id: userId } = req.user;

    const user = await getCurrent(userId);

    if (!user) throw unauthorizedError;

    const { email, subscription } = user;

    res.status(200).json({ email, subscription });
};

const updateSubscriptionController = async (req, res) => {
    const { _id: userId, email } = req.user;
    const { subscription = 'starter' } = req.body;

    const user = await updateSubscription(userId, subscription);

    if (!user) throw unauthorizedError;

    res.status(200).json({ email, subscription });
};

module.exports = { getCurrentController, updateSubscriptionController };