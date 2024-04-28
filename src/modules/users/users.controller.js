const asyncHandler = require("express-async-handler");
const User = require("../../db/models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@des register user
//@routes Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  //Hash Password

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword });
  if (user) {
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }

  res.status(201).json({ message: "User registered" });
});

//@des login user
//@routes Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = await jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }
});

//@des current user
//@routes GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(201).json(req.user);
});

module.exports = {
  registerUser,
  currentUser,
  loginUser,
};
