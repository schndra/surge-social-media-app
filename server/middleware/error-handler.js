import CustomError from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  let customMsg;
  let statusCode;

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.code && err.code === 11000) {
    customMsg = `username ${err.keyValue.username} already taken, please choose another username`;
    statusCode = 400;
  }

  // res.status(500).json({ msg: err });
  return res
    .status(statusCode || 500)
    .json({ msg: customMsg || "something went wrong!!!!" });
};

export default errorHandler;
