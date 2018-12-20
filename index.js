const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const router = require("./routes");

app.use(
  helmet({
    referrerPolicy: { policy: "same-origin" }
  })
);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.set("debug", true);
mongoose.connect(
  process.env.DB || "mongodb://localhost/as-qld",
  { useNewUrlParser: true }
);

mongoose.Promise = Promise;

router(app);

app.listen(PORT, () => `app listening on port ${PORT}`);
