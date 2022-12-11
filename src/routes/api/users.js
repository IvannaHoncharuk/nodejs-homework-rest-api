const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../../middlewares/authMiddleware');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');

const { subscriptionSchema } = require('../../schemas/validUserSchema');
const { userSchema } = require('../../schemas/validUserSchema');
const { validationBody } = require('../../middlewares/validationBody');

const {
    signupController,
    loginController,
    logoutController,
} = require('../../controllers/authController');
const {
    getCurrentController,
    updateSubscriptionController,
    updateAvatarController,
} = require('../../controllers/usersController');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

router.post(
    '/signup',
    validationBody(userSchema),
    ctrlWrapper(signupController)
);

router.post('/login', validationBody(userSchema), ctrlWrapper(loginController));

router.get('/logout', authMiddleware, ctrlWrapper(logoutController));

router.get('/current', ctrlWrapper(getCurrentController));

router.patch(
    '/',
    [authMiddleware, validationBody(subscriptionSchema)],
    ctrlWrapper(updateSubscriptionController)
);

router.patch(
    '/avatars',
    [authMiddleware, uploadMiddleware.single('avatar')],
    ctrlWrapper(updateAvatarController)
);

module.exports = router;