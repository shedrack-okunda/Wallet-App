import React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Box
      sx={{
        flex: 1,
        borderRight: "0.4px solid rgb(230, 227, 227)",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#222222",
          }}
          component={Link}
          to="/"
          style={{ textDecoration: "none" }}
        >
          FinPay
        </Typography>
      </Box>

      <Divider />

      {/* Center Section */}
      <Box sx={{ px: 2, mt: 2 }}>
        <List>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.625rem",
              fontWeight: 700,
              color: "#999999",
              mb: 1,
            }}
          >
            MAIN
          </Typography>
          <ListItemButton component={Link} to="/home">
            <ListItemIcon>
              <DashboardRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{ span: { fontWeight: 600, fontSize: "0.8rem" } }}
            />
          </ListItemButton>

          {isAdmin && (
            <>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "#999999",
                  mt: 2,
                  mb: 1,
                }}
              >
                LIST
              </Typography>
              <ListItemButton component={Link} to="/users">
                <ListItemIcon>
                  <PeopleRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Users"
                  sx={{ span: { fontWeight: 600, fontSize: "0.8rem" } }}
                />
              </ListItemButton>
            </>
          )}

          <ListItemButton component={Link} to="/transactions">
            <ListItemIcon>
              <CompareArrowsRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Transactions"
              sx={{ span: { fontWeight: 600, fontSize: "0.8rem" } }}
            />
          </ListItemButton>

          <ListItemButton component={Link} to="/requests">
            <ListItemIcon>
              <AttachMoneyRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Requests"
              sx={{ span: { fontWeight: 600, fontSize: "0.8rem" } }}
            />
          </ListItemButton>

          <Typography
            variant="caption"
            sx={{
              fontSize: "0.625rem",
              fontWeight: 700,
              color: "#999999",
              mt: 2,
              mb: 1,
            }}
          >
            USER
          </Typography>
          <ListItemButton component={Link} to="/profile">
            <ListItemIcon>
              <AccountBoxRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              sx={{ span: { fontWeight: 600, fontSize: "0.8rem" } }}
            />
          </ListItemButton>

          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ span: { fontWeight: 600, fontSize: "0.8rem" } }}
            />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
