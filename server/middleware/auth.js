import User from "../models/User.js";
import UnAuthorizedError from "../errors/auth-error.js";
import jwt from "jsonwebtoken";
import asyncWrapper from "./catchAsync.js";

const auth = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
    throw new UnAuthorizedError("Authentication Failed");
  }

  const token = authHeader.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(data);
    //add user to post
    const user = await User.findById(data.id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new UnAuthorizedError("Authentication failed");
  }
});

export default auth;
