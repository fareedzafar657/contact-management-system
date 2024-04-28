const express = require("express");
const connectDB = require("./src/db/config/dbConnection");
const errorHandler = require("./src/middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 4001;

app.use(express.json());
app.use("/api/contacts", require("./src/modules/contacts/contacts.routes"));
app.use("/api/users", require("./src/modules/users/users.routes"));

//should be defined after routes
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
