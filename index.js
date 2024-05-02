require("dotenv").config();
const express = require("express");
const UserRouter = require("./Routes/User");
const MongoConnect = require("./Config/Db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
MongoConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: "https://login-system-dun-gamma.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use("/", UserRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
