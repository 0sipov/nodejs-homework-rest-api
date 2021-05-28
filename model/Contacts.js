const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const getData = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await getData();
};

const getContactById = async (contactId) => {
  const data = await getData();
  const result = data.find((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await getData();
  const delitedContactIndex = data.findIndex((e) => {
    return e.id === contactId;
  });
  if (delitedContactIndex === -1) {
    return null;
  }
  const delitedContact = data.splice(delitedContactIndex, 1);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );
  return delitedContact;
};

const addContact = async (body) => {
  const id = uuid();
  const record = { id, ...body };
  const data = await getData();
  data.push(record);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );
  return record;
};

const updateContact = async (contactId, body) => {
  const data = await getData();
  const changeableContactIndex = data.findIndex((e) => {
    return e.id === contactId;
  });
  if (changeableContactIndex === -1) {
    return null;
  }
  const changeableContact = data.splice(changeableContactIndex, 1)[0];
  const changedContact = { ...changeableContact, ...body };
  console.log("changedContact", changedContact);
  const newData = [...data, changedContact];
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(newData)
  );
  return changedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
