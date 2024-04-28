const express = require("express");
const {
  getContacts,
  postContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("./contacts.controller");
const validateToken = require("../../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getContacts).post(postContact);
router
  .route("/:id")
  .get(getContactById)
  .patch(updateContactById)
  .delete(deleteContactById);

module.exports = router;
