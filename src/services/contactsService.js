const Contact = require('../models/contacts');

const getContacts = async (owner, pagination, favorite) => {
    const payload = favorite === 'true' ? { owner, favorite } : { owner };

    return await Contact.find(payload, '', pagination).populate(
        'owner',
        '_id email subscription'
    );
};

const getContactById = async (contactId, userId) => {
    const contact = await Contact.findOne({_id: contactId, owner: userId, }).catch(() => {
        return null;
    });

    return contact;
};

const createContact = async (
    { name, email, phone, favorite = false },
    userId
) => {
    return await Contact.create({
        owner: userId,
        name,
        email,
        phone,
        favorite,
    });
};

const updateContactById = async (contactId, body, userId) => {
    const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId },
        body,
        { new: true }
    ).catch(() => {
        return null;
    });

    return updatedContact;
};

const toggleFavoriteById = async (contactId, body, userId) => {
    const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId },
        body,
        {
            new: true,
        }
    ).catch(() => {
        return null;
    });

    return updatedContact;
};

const deleteContactById = async (contactId, userId) => {
    const deletedContact = await Contact.findOneAndRemove({_id: contactId, owner: userId,}).catch(() => {
        return null;
    });

    return deletedContact;
};
module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContactById,
    toggleFavoriteById,
    deleteContactById,
};