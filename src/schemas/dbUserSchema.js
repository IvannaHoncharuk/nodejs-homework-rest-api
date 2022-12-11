const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        token: {
            type: String,
            default: null,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },

        avatarURL: {
            type: String,
            required: true,
        },

        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.methods.hashPassword = async function (password) {
    this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = userSchema;