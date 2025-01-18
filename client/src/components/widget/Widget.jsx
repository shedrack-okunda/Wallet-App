import { Box, Typography, Link as MuiLink, Paper } from "@mui/material";
import {
  AccountBalanceWalletRounded,
  AssignmentReturnedRounded,
  CompareArrowsRounded,
  KeyboardArrowUpRounded,
  MonetizationOnRounded,
} from "@mui/icons-material";
import AddMoneyModal from "../modal/AddMoneyModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USDollar } from "../../pages/utils/helpOptions";
import { useState } from "react";

const Widget = ({ type }) => {
  const [openModal, setOpenModal] = useState(false);

  const { balance, moneySend, moneyReceived, requestReceived } = useSelector(
    (state) => state.auth.user
  );

  let data;

  const diff = 20; // Example percentage difference

  switch (type) {
    case "user":
      data = {
        title: "MONEY SEND",
        isMoney: false,
        link: "/transactions",
        isSend: true,
        linkText: "Money Sent To",
        icon: (
          <CompareArrowsRounded
            sx={{
              color: "crimson",
              bgcolor: "rgba(255,0,0,0.2)",
              p: 1,
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "MONEY RECEIVED",
        isMoney: false,
        link: "/transactions",
        isReceived: true,
        linkText: "Money Received",
        icon: (
          <AssignmentReturnedRounded
            sx={{
              color: "goldenrod",
              bgcolor: "rgba(218,165,32,0.2)",
              p: 1,
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "REQUEST RECEIVED",
        isMoney: true,
        link: "/requests",
        isAnyReq: true,
        linkText: "Requests Received",
        icon: (
          <MonetizationOnRounded
            sx={{
              color: "green",
              bgcolor: "rgba(0,128,0,0.2)",
              p: 1,
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "/balance",
        isBalance: true,
        linkText: "Add Money",
        icon: (
          <AccountBalanceWalletRounded
            sx={{
              color: "purple",
              bgcolor: "rgba(128,0,128,0.2)",
              p: 1,
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  const addMoney = () => {
    setOpenModal(true);
  };

  return (
    <>
      {openModal && <AddMoneyModal setAddMoneyModal={setOpenModal} />}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderRadius: 2,
          height: "8.25rem",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={700} color="text.secondary">
            {data.title}
          </Typography>
          <Typography variant="h4" fontWeight={500}>
            {data.isSend && moneySend}
            {data.isReceived && moneyReceived}
            {data.isAnyReq && requestReceived}
            {data.isBalance && USDollar.format(balance)}
          </Typography>
          {data.link === "/balance" ? (
            <Typography
              sx={{
                cursor: "pointer",
                color: "primary.main",
                textDecoration: "underline",
              }}
              onClick={addMoney}
            >
              {data.linkText}
            </Typography>
          ) : (
            <MuiLink
              component={Link}
              to={data.link}
              underline="hover"
              color="primary.main"
            >
              {data.linkText}
            </MuiLink>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "success.main",
            }}
          >
            <KeyboardArrowUpRounded />
            {diff}%
          </Box>
          {data.icon}
        </Box>
      </Paper>
    </>
  );
};

export default Widget;
