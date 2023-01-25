import express from "express";
const router = express.Router();
import { login, register } from "../controllers/userController.js";

router.route("/").post(login);
router.route("/register").post(register);

export default router;
