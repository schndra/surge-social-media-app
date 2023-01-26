import CustomError from "./custom-error.js";

class BadReqError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadReqError;
