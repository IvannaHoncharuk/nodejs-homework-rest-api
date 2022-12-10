const User = require('../models/user');

const getCurrent = async userId => {
    const user = await User.findById(userId).catch(() => {
        return null;
    });

    return user;
};

const updateSubscription = async (userId, subscription) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { subscription },
        { new: true }
    ).catch(() => {
        return null;
    });

    return user;
};

module.exports = { getCurrent, updateSubscription };