const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
    return result;  
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const contactToFind = result.find(
      contact => contact.id === contactId.toString()
    )
    console.log(contactToFind);
    return contactToFind;  
  } catch (error) {
    console.log(error);
  }
}
  
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const contactToFind = result.find(
      contact => contact.id === contactId.toString()
    );
    const index = result.indexOf(contactToFind);
    result.splice(index, 1);
    const newData = await fs.writeFile(contactsPath, JSON.stringify(result));
    console.table(result);
    return newData;  
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const newContact = {
      id: (result.length + 1).toString(),
      name: name,
      email: email,
      phone: phone,
    }
    result.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(result));
    console.table(result);
    return result;  
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}



// {
//   "id": "3",
//   "name": "Kennedy Lane",
//   "email": "mattis.Cras@nonenimMauris.net",
//   "phone": "(542) 451-7038"
// },