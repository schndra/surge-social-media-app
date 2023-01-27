import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postImage: {
      type: String,
      //   required: [true, "please provide post image"],
    },

    createdUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },

    postLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } //created at and updated at
);

export default mongoose.model("Posts", postSchema);
