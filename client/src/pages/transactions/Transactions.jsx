import TabPanel from "@mui/lab/TabPanel";
import Received from "./Received";
import Send from "./Send";
import { Box, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";

const Transactions = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
      className="transaction"
    >
      <Sidebar />
      <Box
        sx={{
          flex: 6,
        }}
        className="transactionContainer"
      >
        <Navbar />
        <Box
          sx={{
            padding: "1.25rem",
          }}
          className="transactions"
        >
          <h1 className="transactionTitle">Transaction history</h1>
          <Box
            sx={{
              boxShadow: 2,
              borderRadius: "8px",
              overflow: "hidden",
            }}
            className="transactionsList"
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList
                  className="tabList"
                  onChange={handleChange}
                  aria-label="send/receive tabs"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "var(--primaryColor)",
                    },
                    "& .Mui-selected": {
                      color: "var(--primaryColor)",
                    },
                  }}
                >
                  <Tab label="Send" className="singleTab" value="1" />
                  <Tab label="Received" className="singleTab" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Send />
              </TabPanel>
              <TabPanel value="2">
                <Received />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Transactions;
