require("dotenv").config();
const express = require("express");
const UserRouter = require("./Routes/User");
const MongoConnect = require("./Config/Db");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

MongoConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.resolve("view"));

app.use("/", UserRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
