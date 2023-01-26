import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 40,
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 6,
    maxlength: 12,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
    maxlength: 12,
  },
});

export default mongoose.model("User", userSchema);
