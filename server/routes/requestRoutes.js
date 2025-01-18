import express from "express";
import {
  requestAmount,
  getAllRequest,
  updateRequestStats,
  getRequestSendTransaction,
  getRequestReceivedTransaction,
} from "../controllers/requestController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/request").post(protect, requestAmount);
router.route("/get-request").post(protect, getAllRequest);
router.route("/update-request-status").post(protect, updateRequestStats);
router.route("/request-send").get(protect, getRequestSendTransaction);
router.route("/request-received").get(protect, getRequestReceivedTransaction);

export default router;
