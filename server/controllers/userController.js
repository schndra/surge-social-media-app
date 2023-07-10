import User from "../models/User.js";
import asyncWrapper from "../middleware/catchAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BadReqError from "../errors/bad-request-error.js";
import UnAuthorizedError from "../errors/auth-error.js";
import axios from "axios";

const register = asyncWrapper(async (req, res) => {
  // console.log(req.body);
  const { password, name, username, email, captchaToken } = req.body;

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captchaToken}`
  );
  if (response.data.success) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    const hashedUser = {
      name,
      email,
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
    res.status(201).json({
      user: { name: user.name, email: user.email, username: user.username },
      token,
    });
  } else {
    throw new UnAuthorizedError("Please complete recaptcha");
  }
});

const login = asyncWrapper(async (req, res) => {
  // console.log(req.body);
  // console.log(req.headers);
  const { username, password, email, captchaToken } = req.body;
  // console.log(captchaToken);
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captchaToken}`
  );

  if (response.data.success) {
    if ((!username && !email) || !password) {
      throw new BadReqError("please provide username or password");
    }
    let find = {};
    if (username) {
      find = { ...find, username };
    }
    if (email) {
      find = { ...find, email };
    }
    console.log(find);

    const user = await User.findOne(find);
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

    res.status(201).json({
      user: { name: user.name, username: user.username, email: user.email },
      token,
    });
  } else {
    throw new UnAuthorizedError("Please complete recaptcha");
  }
});

export { register, login };
