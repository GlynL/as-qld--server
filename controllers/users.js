const jwt = require("jsonwebtoken");
const User = require("../models/user");

function tokenForUser(user) {
  console.log(user);
  return jwt.sign({ data: user.id }, process.env.SECRET);
}

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  // ensure email & password included
  if (!email || !password)
    return res
      .status(422)
      .json({ error: "You must provide a username or password." });

  try {
    // check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(422).json({ error: "Email already in use." });
    // create new user
    const newUser = new User({ email, password, subscribed: false });
    const user = await newUser.save();
    // respond with token
    return res.json({ token: tokenForUser(user) });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  res.json({ token: tokenForUser(req.user) });
};

exports.subscribe = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.SECRET);
    await User.findByIdAndUpdate(user._id, { subscribed: true });
    res.json({ message: "Subscribed sucessfully" });
  } catch (e) {
    next(e);
  }
};

exports.unsubscribe = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.SECRET);
    await User.findByIdAndUpdate(user._id, { subscribed: false });
    res.json({ message: "Unsubscribed successfully." });
  } catch (e) {
    next(e);
  }
};

exports.fetchUsers = async (req, res, next) => {
  // id passed in query string ?id=141348
  const id = req.query.id;
  res.json({ message: "fetch users" });
};

exports.updateUser = async (req, res, next) => {
  res.json({ message: "update user" });
};
