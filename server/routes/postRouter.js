import express from "express";
const router = express.Router();
import { getAllPosts, createPost } from "../controllers/postController.js";
import auth from "../middleware/auth.js";

router.route("/").get(auth, getAllPosts).post(auth, createPost);

export default router;
