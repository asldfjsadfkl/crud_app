const express = require("express");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/sendToken");
const User = require("../MongoDB/User_Model.js");
const ErrorHandler = require("../utils/ErrorHandler");
const LIST = require("../MongoDB/listModel.js");

//post register
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const old = await User.findOne({ email });
  if (old) {
    return next(new ErrorHandler("User already exist!", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, res, "Registerd", 201);
};

//post login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new ErrorHandler("Something incorrect!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Something incorrect!", 400));
    }
    const comp = await user.comparePassword(password);
    // const comp = await bcrypt.compare(password,user.password);
    if (!comp) {
      return next(new ErrorHandler("Something incorrect!", 400));
    }
    sendToken(user, res, "Login", 200);
  } catch (error) {
    console.log(error.message);
  }
};

/// get logout
exports.logout = async (req, res) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnley: true,
  };
  res.status(200).cookie("token", null, options).json({
    message: "user logout",
  });
};

//get user detail
exports.getUser = async (req, res) => {
  const user = await User.findOne(req.user);
  const listCount = await LIST.count();
  res.status(200).json({
    isAuth: true,
    user,
    listCount,
  });
};

// changePassword
exports.changePassword = async (req, res, next) => {
  const { oldPass, newPass } = req.body;
  try {
    if (!oldPass || !newPass) {
      return next(new ErrorHandler("fill Correctly", 400));
    }
    const user = await User.findById(req.user._id).select("+password");
    const comp = await user.comparePassword(oldPass);
    if (!comp) {
      return next(new ErrorHandler("something is incorrect!", 400));
    }
    user.password = newPass;
    await user.save();
    res.status(200).json({
      message: "Password Changed",
    });
  } catch (error) {}
};

// exports.fargotPassword = (req,res,next) => {
// }
// exports.resetPassword = (req,res,next) => {
// }
