const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./src/.env" });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

routes(app);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
