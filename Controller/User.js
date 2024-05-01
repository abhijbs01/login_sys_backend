const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");

async function CreateUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: true,
      message: "User Registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function LoginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User is not registered!",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Password is incorrect!",
      });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT, {
      expiresIn: "10m",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({
      status: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function ForgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({
        message: "User is not registered!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "10m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:process.env.USER,
        pass:process.env.PWD,
      },
    });

    var mailOptions = {
      from: "abhishekvaghasiya00@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send reset email" });
      } else {
        console.log("Reset email sent: " + info.response);
        res
          .status(200)
          .json({ message: `Reset email sent successfully! ${email}` });
      }
    });
  } catch (error) {
    console.error("ForgotPassword Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function ResetPassword(req, res) {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    const id = decoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Invalid token" });
  }
}

async function verifyUser(req, res) {
  return res.json({
    message: "authorized",
    status: true,
  });
}

async function LogoutUser(req, res) {
  res.clearCookie("token");
  return res.json({
    message: "Logout successfully",
    status: true,
  });
}

module.exports = {
  CreateUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
  verifyUser,
  LogoutUser,
};
