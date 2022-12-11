const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { getCurrent, updateSubscription, updateAvatar} = require('../services/usersService');

const { unauthorizedError, wrongUploadError } = require('../helpers/errors');

const AVATARS_DIR = path.resolve('public/avatars');

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

    res.status(200).json({ email, subscription });
};

const updateAvatarController = async (req, res) => {
    if (!req.file) throw wrongUploadError;
    const { path: tempImagePath, originalname } = req.file;

    const newImageName = `${uuid()}_${originalname}`;
    const newImagePath = path.join(AVATARS_DIR, newImageName);

    try {
        const image = await Jimp.read(tempImagePath);
        await image.resize(250, 250);
        await image.writeAsync(newImagePath);
    } catch (error) {
        await fs.unlink(tempImagePath);
        throw error;
    }

    const avatarURL = path.join('avatars', newImageName);

    await updateAvatar(req.user._id, avatarURL);

    res.json({ avatarURL });
};

module.exports = { getCurrentController, updateSubscriptionController, updateAvatarController };