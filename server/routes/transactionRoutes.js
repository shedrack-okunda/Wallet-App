import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  transferAmount,
  deposit,
  verifyReceiver,
  getMoneySendTransactions,
  getMoneyReceiveTransactions,
  getTransactions,
} from "../controllers/transactionController.js";
const router = express.Router();

router.route("/transfer").post(protect, transferAmount);
router.route("/deposit").post(protect, deposit);
router.route("/verify-receiver").post(protect, verifyReceiver);
router.route("/get-money-send").get(protect, getMoneySendTransactions);
router.route("/get-money-receive").get(protect, getMoneyReceiveTransactions);
router.route("/get-transactions/:id").get(protect, getTransactions);

export default router;
