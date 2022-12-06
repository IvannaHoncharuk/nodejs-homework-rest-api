const path = require('path');
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, "../models/contacts.json");

async function listContacts () {
    try {
        const contacts = await fs.readFile(contactsPath, "utf-8");
        const parsedContacts = JSON.parse(contacts);
      
        return parsedContacts;
    } catch (error) {
        console.log(error);
    }
};

async function getContactById (contactId) {
    try {
        const contacts = await fs.readFile(contactsPath, "utf-8");
        const parsedContacts = JSON.parse(contacts);

        const stringedContactId = contactId.toString();

        const contactById = parsedContacts.find(
            contact => contact.id === stringedContactId
        );

        return contactById || null;
    } catch (error) {
        console.log(error);
    }
};

async function removeContact (contactId) {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf8');
        const parsedContacts = JSON.parse(contacts);

        const stringedContactId = contactId.toString();

        const indexRemovedContact = parsedContacts.findIndex(
            contact => contact.id === stringedContactId
        );

        if (indexRemovedContact === -1) {
            return null;
        }

        const [removedContact] = parsedContacts.splice(indexRemovedContact, 1);

        const stringedContactsList = JSON.stringify(parsedContacts);

        await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

        return removedContact;
    } catch (error) {
        console.log(error);
    }
};

async function addContact(body) {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    const newContact = { id: uuid(), ...body };
    parsedContacts.push(newContact);

    const stringedContactsList = JSON.stringify(parsedContacts);

    await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

    return newContact;
  } catch (error) {
      console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    const stringedContactId = contactId.toString();

    const indexUpdatedContact = parsedContacts.findIndex(
      contact => contact.id === stringedContactId
    );

    if (indexUpdatedContact === -1) {
      return null;
    }

    parsedContacts[indexUpdatedContact] = {
      ...parsedContacts[indexUpdatedContact],
      ...body,
    };

    const stringedContactsList = JSON.stringify(parsedContacts);
  
    await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

    return parsedContacts[indexUpdatedContact];

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
