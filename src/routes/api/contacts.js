const express = require('express');

const router = express.Router();

const {
  addContactSchema,
  updateContactSchema,
  toggleFavoriteSchema,
} = require('../../schemas/validContactsSchema');

const { validationBody } = require('../../middlewares/validationBody');

const {
    getContactsController,
    getContactByIdController,
    createContactController,
    updateContactByIdController,
    toggleFavoriteByIdController,
    deleteContactByIdController,
} = require('../../controllers/contactsController');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

const { authMiddleware } = require('../../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
    '/',
    validationBody(addContactSchema),
    ctrlWrapper(createContactController)
);

router.put(
    '/:contactId',
    validationBody(updateContactSchema),
    ctrlWrapper(updateContactByIdController)
);

router.patch(
    '/:contactId/favorite',
    validationBody(toggleFavoriteSchema),
    ctrlWrapper(toggleFavoriteByIdController)
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

module.exports = router;
