const asyncHandler = require("express-async-handler");
const {
  findAll,
  createContact,
  findOneContact,
  updateContact,
  deleteContact,
} = require("./contacts.repository");

//@des Get all contacts
//@routes Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await findAll({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@des create contact
//@routes Post /api/contacts
//@access private
const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await createContact({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@des Get a contact
//@routes Get /api/contacts/:id
//@access private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await findOneContact(req, res);
  res.status(200).json(contact);
});

//@des Update a contact
//@routes Patch /api/contacts/:id
//@access private
const updateContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await findOneContact(req, res);

  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    res.status(500);
    throw new Error("Nothing to update");
  }

  const contact = await updateContact(id, { name, email, phone });
  if (!contact) {
    res.status(500);
    throw new Error("Contact not updated");
  }
  res.json(contact);
});

//@des Delete a contact
//@routes Delete /api/contacts/:id
//@access private
const deleteContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await findOneContact(req, res);
  const contact = await deleteContact(id);
  if (!contact) {
    res.status(500);
    throw new Error("Contact not deleted");
  }
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  postContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
