import express from "express";
const router = express.Router();
import { getAllPost } from "../controllers/postController.js";
import auth from "../middleware/auth.js";

router.route("/").get(auth, getAllPost);

export default router;
