import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { optionsDate, optionsTime, USDollar } from "../utils/helpOptions";
import Loader from "../../components/loader/Loader";
import {
  getReceivedTransactions,
  reset,
} from "../../features/transactions/transactionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Received = () => {
  const dispatch = useDispatch();
  const { received, isLoading } = useSelector((state) => state.transact);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReceivedTransactions());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: "flex", width: "100%", padding: "1.25rem" }}>
      <Box sx={{ flex: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: "1rem" }}>
          Received Transactions
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="received transactions table"
          >
            <TableHead>
              <TableRow>
                {[
                  "Received From",
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
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                      textTransform: "uppercase",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {received.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      src={transaction.sender.image}
                      alt={transaction.sender.name}
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "0.75rem",
                      }}
                    />
                    {transaction.sender.name}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleString(
                      "en-US",
                      optionsDate
                    )}
                    <Box
                      sx={{
                        fontSize: "0.875rem",
                        color: "gray",
                        marginTop: "0.25rem",
                      }}
                    >
                      at{" "}
                      {new Date(transaction.createdAt).toLocaleString(
                        "en-US",
                        optionsTime
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        color: "#fff",
                        backgroundColor:
                          transaction.transactionType === "deposit"
                            ? "#28a745"
                            : transaction.transactionType === "transfer"
                            ? "#007bff"
                            : transaction.transactionType === "payment"
                            ? "#ffc107"
                            : transaction.transactionType === "refund"
                            ? "#dc3545"
                            : "#6c757d",
                      }}
                    >
                      {transaction.transactionType}
                    </Box>
                  </TableCell>
                  <TableCell>{USDollar.format(transaction.amount)}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Received;
