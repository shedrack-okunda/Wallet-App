import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  currentUser,
  getUsers,
  getImage,
  verify,
  login,
  register,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current-user").get(protect, currentUser);
router.route("/get-users").get(protect, getUsers);
router.route("/get-image").get(protect, getImage);
router.route("/verify/:id").put(protect, admin, verify);

export default router;
