const asyncHandler = require("express-async-handler");
const Contact = require("../../db/models/contact.model");
const mongoose = require("mongoose");

const findAll = asyncHandler(async (query) => {
  const contacts = await Contact.find(query);
  return contacts;
});

const createContact = asyncHandler(async (query) => {
  const contact = await Contact.create(query);
  return contact;
});

const findOneContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid Id");
  }
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is unauthorized");
  }
  return contact;
});

const updateContact = asyncHandler(async (id, query) => {
  const contact = await Contact.findByIdAndUpdate(id, query, { new: true });
  return contact;
});

const deleteContact = asyncHandler(async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  return contact;
});

module.exports = {
  findAll,
  createContact,
  findOneContact,
  updateContact,
  deleteContact,
};
