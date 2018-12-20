const users = require("./users.js");

module.exports = function(app) {
  app.get("/", (req, res, next) => res.json({ message: "index route" }));
  app.use("/api/users", users);
};
