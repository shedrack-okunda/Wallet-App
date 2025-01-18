import {
  Avatar,
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
import Loader from "../loader/Loader";
import RequestModel from "../modal/RequestModal";
import SendModal from "../modal/SendModal";
import { useEffect, useState } from "react";
import { getAllUsers, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const [sendModal, setSendModal] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const [requestModal, setRequestModal] = useState(false);
  const [requestTo, setRequestTo] = useState("");
  const dispatch = useDispatch();

  const { users, isSuccess, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSendModal = (userId) => {
    setReceiverId(userId);
    setRequestModal(false);
    setSendModal(true);
  };

  const handleRequestModal = (userId) => {
    setRequestTo(userId);
    setSendModal(false);
    setRequestModal(true);
  };

  return (
    <>
      {sendModal && (
        <SendModal receiverId={receiverId} setSendModalOpen={setSendModal} />
      )}
      {requestModal && (
        <RequestModel
          requestTo={requestTo}
          setRequestModalOpen={setRequestModal}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Acc No:</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={user.image || undefined}
                        alt={user.name}
                        sx={{ marginRight: 2, width: 40, height: 40 }}
                      />
                      <Typography>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Typography
                      onClick={() => handleSendModal(user._id)}
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        marginRight: 2,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Send
                    </Typography>
                    <Typography
                      onClick={() => handleRequestModal(user._id)}
                      sx={{
                        cursor: "pointer",
                        color: "secondary.main",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Request
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserList;
