const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  fetchUsers,
  updateUser,
  subscribe,
  unsubscribe
} = require("../controllers/users");

const { requireAuth, requireSignin } = require("../services/passport");

// use query for id ?id=dfkdal
router.get("/", fetchUsers);
router.post("/signup", signup);
router.post("/login", requireSignin, login);
router.post("/subscribe", requireAuth, subscribe);
router.post("/unsubscribe", requireAuth, unsubscribe);
router.put("/", updateUser);

module.exports = router;
