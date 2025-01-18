import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import crypto from "crypto";

export const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    address,
    identificationType,
    balance,
    moneyReceived,
    moneySend,
    requestReceived,
  } = req.body;
  console.log(req.body);

  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !identificationType
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   checks if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({
    name,
    email,
    balance,
    password: hashedPassword,
    phone,
    address,
    identificationType,
    moneySend,
    moneyReceived,
    requestReceived,
    identificationNumber: crypto.randomBytes(6).toString("hex"),
    isAdmin: false,
    isVerified: true,
  });

  await user.save();

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      balance: user.balance,
      email: user.email,
      phone: user.phone,
      address: user.address,
      moneySend: user.moneySend,
      moneyReceived: user.moneyReceived,
      requestReceived: user.requestReceived,
      identificationType: user.identificationType,
      identificationNumber: user.identificationNumber,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    var userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ ...userObj, token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

export const currentUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };

  res.status(200).json(user);
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  let newUsers = users.filter((user) => {
    return user._id.toString() !== req.user._id.toString();
  });

  if (newUsers) {
    res.status(200).json(newUsers);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const verify = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      isVerified: req.body.isVerified,
    },
    { new: true }
  );

  if (user) {
    res
      .status(201)
      .json({ _id: user._id, name: user.name, isVerified: user.isVerified });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.image) {
    res.status(201).json(user.image);
  } else {
    res.status(404);
    throw new Error("No user image");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
