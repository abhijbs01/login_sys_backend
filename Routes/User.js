const express = require("express");
const {
  CreateUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
  verifyUser,
  LogoutUser
} = require("../Controller/User");
const Auth = require("../Middleware/auth");

const UserRouter = express.Router();

UserRouter.post("/sign-up", CreateUser);
UserRouter.post("/login", LoginUser);
UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.post("/reset-password/:token", ResetPassword);
UserRouter.get("/verify", Auth, verifyUser);
UserRouter.get("/logout", LogoutUser);

module.exports = UserRouter;
