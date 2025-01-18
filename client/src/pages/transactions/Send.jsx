import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { optionsDate, optionsTime, USDollar } from "../utils/helpOptions";
import Loader from "../../components/loader/Loader";
import {
  getSendTransactions,
  reset,
} from "../../features/transactions/transactionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Send = () => {
  const dispatch = useDispatch();

  const { send, isLoading } = useSelector((state) => state.transact);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSendTransactions());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="transaction table">
        <TableHead>
          <TableRow>
            {[
              "Send To",
              "Date",
              "Transaction Id",
              "Transaction Type",
              "Amount",
              "Reference",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                  color: "#333",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {send.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={transaction.receiver.image}
                  alt={transaction.receiver.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                {transaction.receiver.name}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {new Date(transaction.createdAt).toLocaleString(
                  "en-US",
                  optionsDate
                )}
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.8rem", color: "gray" }}
                >
                  at{" "}
                  {new Date(transaction.createdAt).toLocaleString(
                    "en-US",
                    optionsTime
                  )}
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {transaction.transactionId}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    color: "#fff",
                    backgroundColor:
                      transaction.transactionType === "deposit"
                        ? "#4caf50"
                        : transaction.transactionType === "transfer"
                        ? "#2196f3"
                        : transaction.transactionType === "payment"
                        ? "#ff9800"
                        : "#f44336",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {transaction.transactionType}
                </Box>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {USDollar.format(transaction.amount)}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {transaction.reference}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Send;
