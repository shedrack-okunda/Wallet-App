import { useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/auth/authSlice";
import { verify, verifyReset } from "../../features/verify/verifySlice";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Admin = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.auth);
  const { verifySuccess } = useSelector((state) => state.verify);

  useEffect(() => {
    dispatch(getAllUsers());
    if (verifySuccess) {
      dispatch(verifyReset());
    }
  }, [dispatch, verifySuccess]);

  const handleVerify = (user) => {
    const verifiedUser = {
      _id: user._id,
      isVerified: true,
    };
    dispatch(verify(verifiedUser));
  };

  return (
    <Box display="flex" width="100%">
      <Sidebar />
      <Box flex={6}>
        <Navbar />
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Box sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
            {isLoading ? (
              <Loader />
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="users table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Acc No:</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user._id}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              src={user.image}
                              alt={user.name}
                              sx={{ mr: 2, width: 40, height: 40 }}
                            />
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          {user.isVerified ? (
                            <Button
                              variant="contained"
                              disabled
                              sx={{
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                cursor: "default",
                              }}
                            >
                              Verified
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => handleVerify(user)}
                              sx={{
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                "&:hover": {
                                  backgroundColor: "#1565c0",
                                },
                              }}
                            >
                              Verify
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
