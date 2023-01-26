import User from "../models/User.js";
import asyncWrapper from "../middleware/catchAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BadReqError from "../errors/bad-request-error.js";
import UnAuthorizedError from "../errors/auth-error.js";

const register = asyncWrapper(async (req, res) => {
  const { password, name, username } = req.body;

  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);

  const hashedUser = {
    name,
    username,
    password: hash,
  };
  const user = await User.create({ ...hashedUser });
  // console.log(user);
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  // console.log(user);
  res.status(201).json({ user: { name: user.name }, token });
});

const login = asyncWrapper(async (req, res) => {
  // console.log(req.headers);
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadReqError("please provide username or password");
  }

  const user = await User.findOne({ username });
  // console.log(user);

  if (!user) {
    throw new UnAuthorizedError("Invalid username or password");
  }

  //compare password (returns a bool)
  const isMatched = await bcrypt.compare(password, user.password);
  // console.log(isMatched);
  if (!isMatched) {
    throw new UnAuthorizedError("Invalid password, try again!");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.status(201).json({ user: { name: user.name }, token });
});

export { register, login };
