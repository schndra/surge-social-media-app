import User from "../models/User.js";
import BadReqError from "../errors/bad-request-error.js";
import asyncWrapper from "../middleware/catchAsync.js";

const register = asyncWrapper(async (req, res) => {
  const { name, username, password } = req.body;

  //custom error
  if (!name) {
    throw new BadReqError("please provide name");
  }

  const user = await User.create({ ...req.body });
  // console.log(user);
  res.status(201).json({ user });

  // try {
  //   const user = await User.create({ ...req.body });
  //   // console.log(user);
  //   res.status(201).json({ user });
  // } catch (error) {
  //   console.log(error);
  //   // res
  //   //   .status(500)
  //   //   .json({ msg: `username ${error.keyValue.username} already exists` });
  // }
});

const login = asyncWrapper(async (req, res) => {
  res.send("login user");
});

export { register, login };
