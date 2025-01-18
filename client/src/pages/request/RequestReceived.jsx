import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { optionsDate, optionsTime, USDollar } from "../utils/helpOptions";
import Loader from "../../components/loader/Loader";
import {
  payReset,
  requestReceived,
  reset,
  updateRequest,
} from "../../features/request/requestSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequestReceived = () => {
  const dispatch = useDispatch();

  const { received, isLoading, reqSuccess } = useSelector(
    (state) => state.request
  );

  useEffect(() => {
    dispatch(requestReceived());
    if (reqSuccess) {
      dispatch(payReset());
    }
  }, [dispatch, reqSuccess]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleClick = (transaction) => {
    const newRequest = {
      _id: transaction._id,
      sender: transaction.receiver._id,
      receiver: transaction.sender._id,
      amount: transaction.amount,
      transactionType: "deposit",
      reference: "payment reference",
      status: "accepted",
    };
    dispatch(updateRequest(newRequest));
  };

  if (isLoading || reqSuccess) {
    return <Loader />;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="received requests table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Request from
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Received At
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Amount
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Description
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {received.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <img
                    src={transaction.sender.image}
                    alt={transaction.sender.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  {transaction.sender.name}
                </div>
              </TableCell>
              <TableCell>
                {new Date(transaction.createdAt).toLocaleString(
                  "en-US",
                  optionsDate
                )}
                <Typography variant="body2" color="text.secondary">
                  at{" "}
                  {new Date(transaction.createdAt).toLocaleString(
                    "en-US",
                    optionsTime
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color:
                      transaction.status === "pending"
                        ? "orange"
                        : transaction.status === "accepted"
                        ? "green"
                        : "red",
                  }}
                >
                  {transaction.status}
                </Typography>
              </TableCell>
              <TableCell>{USDollar.format(transaction.amount)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {transaction.status === "pending" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick(transaction)}
                    sx={{ textTransform: "none" }}
                  >
                    Accept and pay
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    disabled
                    sx={{ textTransform: "none" }}
                  >
                    Paid
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestReceived;
