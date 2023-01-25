import express from "express";
const router = express.Router();
import { getAllPost } from "../controllers/postController.js";

router.route("/").get(getAllPost);

export default router;
