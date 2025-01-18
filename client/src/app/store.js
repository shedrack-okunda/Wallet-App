import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import requestSlice from "../features/request/requestSlice";
import transactionSlice from "../features/transactions/transactionSlice";
import verifySlice from "../features/verify/verifySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    transact: transactionSlice,
    request: requestSlice,
    verify: verifySlice,
  },
});
