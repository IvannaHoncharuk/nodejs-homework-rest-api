const {
    getContacts,
    getContactById,
    createContact,
    updateContactById,
    toggleFavoriteById,
    deleteContactById,
} = require('../services/contactsService');

const { notFoundError } = require('../helpers/errors');

const getContactsController = async (req, res) => {
    const { _id: userId } = req.user;
    const { page = 1, limit = 5, favorite = false } = req.query;

    const pagination = {
        skip: (page - 1) * limit,
        limit: Number(limit) > 10 ? 10 : Number(limit),
    };

    const contacts = await getContacts(userId, pagination, favorite);

    res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const contact = await getContactById(contactId, userId);

    if (!contact) throw notFoundError;

    res.status(200).json(contact);
};

const createContactController = async (req, res) => {
    const { _id: userId } = req.user;

    const createdContact = await createContact(req.body, userId);

    if (!createdContact) throw notFoundError;

    res.status(201).json(createdContact);
};

const updateContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const updatedContact = await updateContactById(contactId, req.body, userId);

    if (!updatedContact) throw notFoundError;

    res.status(200).json(updatedContact);
};

const toggleFavoriteByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const updatedContact = await toggleFavoriteById(
        contactId,
        req.body,
        userId
    );

    if (!updatedContact) throw notFoundError;

    res.status(200).json(updatedContact);
};

const deleteContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const deletedContact = await deleteContactById(contactId, userId);

    if (!deletedContact) throw notFoundError;

    res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
    getContactsController,
    getContactByIdController,
    createContactController,
    updateContactByIdController,
    toggleFavoriteByIdController,
    deleteContactByIdController,
};