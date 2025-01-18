import { Box, Tab, Typography } from "@mui/material";
import RequestReceived from "./RequestReceived";
import RequestSend from "./RequestSend";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

const Request = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <Box sx={{ flex: 6 }}>
        <Navbar />
        <Box sx={{ padding: "1.25rem" }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "1.5rem",
              fontWeight: 700,
              fontSize: "1.5rem",
              lineHeight: "1.2",
            }}
          >
            Fund requests
          </Typography>
          <Box
            sx={{
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .Mui-selected": {
                      color: "primary.main",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="send/receive tabs"
                    sx={{
                      "& .MuiTab-root": {
                        fontWeight: 600,
                        fontSize: "1rem",
                      },
                    }}
                  >
                    <Tab label="Send" value="1" />
                    <Tab label="Received" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <RequestSend />
                </TabPanel>
                <TabPanel value="2">
                  <RequestReceived />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Request;
