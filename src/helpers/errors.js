const wrongUploadError = new Error('Wrong file type');
wrongUploadError.status = 400;

const unauthorizedError = new Error('Not authorized');
unauthorizedError.status = 401;

const loginAuthError = new Error('Email or password is wrong');
unauthorizedError.status = 401;

const notFoundError = new Error('Not found');
notFoundError.status = 404;

const conflictError = new Error('Email in use');
conflictError.status = 409;

module.exports = {
    wrongUploadError,
    unauthorizedError,
    notFoundError,
    conflictError,
    loginAuthError,
};