import Post from "../models/Post.js";
import asyncWrapper from "../middleware/catchAsync.js";
import axios from "axios";

const createPost = asyncWrapper(async (req, res) => {
  const { postLikes } = req.body;

  // res.json(req.user);
  //get random image for testing purposes --> remove require in postImage post creation
  const resp = await axios.get(
    "https://source.unsplash.com/random/?city,night"
  );
  // console.log(resp.request.res.responseUrl);
  const currPost = {
    postImage: `${resp.request.res.responseUrl}`,
    postLikes,
    createdUser: req.user._id,
  };

  const post = await Post.create(currPost);
  console.log(post);
  res.status(201).json(post);
});

const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1, postLikes: -1 })
    .populate("createdUser", ["name", "email", "username"]);

  res.status(200).json({ posts });
};

export { getAllPosts, createPost };
