import CustomError from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  let customMsg;
  let statusCode;

  //custom error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.code && err.code === 11000) {
    customMsg = `account already exist with ${
      err.keyValue.username ? `username` : `email`
    } ${err.keyValue.username || err.keyValue.email}`;
    statusCode = 400;
  }
  if (err.name === "ValidationError") {
    customMsg = Object.values(err.errors)
      .map((obj) => obj.message)
      .join(",");
    statusCode = 400;
  }

  // return res.status(500).json({ msg: err });
  return res
    .status(statusCode || 500)
    .json({ msg: customMsg || "something went wrong!!!!" });
};

export default errorHandler;
