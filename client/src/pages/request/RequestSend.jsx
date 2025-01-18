import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { optionsDate, optionsTime, USDollar } from "../utils/helpOptions";
import Loader from "../../components/loader/Loader";
import { requestSend, reset } from "../../features/request/requestSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequestSend = () => {
  const dispatch = useDispatch();
  const { send, isLoading } = useSelector((state) => state.request);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(requestSend());
  }, [dispatch]);

  if (isLoading) {
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Send To
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Send At
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
              Paid At
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {send.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <img
                  src={transaction.receiver.image}
                  alt={transaction.receiver.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                {transaction.receiver.name}
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: "0.875rem",
                  color: "text.secondary",
                }}
              >
                {new Date(transaction.createdAt).toLocaleString(
                  "en-US",
                  optionsDate
                )}
                <div style={{ fontSize: "0.75rem", color: "text.disabled" }}>
                  at{" "}
                  {new Date(transaction.createdAt).toLocaleString(
                    "en-US",
                    optionsTime
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    color:
                      transaction.status === "pending"
                        ? "orange"
                        : transaction.status === "accepted"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {USDollar.format(transaction.amount)}
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: "0.875rem",
                  color: "text.secondary",
                }}
              >
                {transaction.status === "accepted" ? (
                  <>
                    {new Date(transaction.updatedAt).toLocaleString(
                      "en-US",
                      optionsDate
                    )}
                    <div
                      style={{ fontSize: "0.75rem", color: "text.disabled" }}
                    >
                      at{" "}
                      {new Date(transaction.updatedAt).toLocaleString(
                        "en-US",
                        optionsTime
                      )}
                    </div>
                  </>
                ) : (
                  "not paid"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestSend;
