const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [tokenType, token] = authorization.split(' ');

    try {
        if (tokenType !== 'Bearer') {
            next({ status: 401, message: `Not authorized` });
        }

        const { _id: userId } = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(userId);

        if (!user || !user.token) {
            next({ status: 401, message: `Not authorized` });
        }

        req.user = user;
        next();
    } catch (error) {
        next({ status: 401, message: `Not authorized` });
    }
};

module.exports = { authMiddleware };