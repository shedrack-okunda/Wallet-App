import React from "react";
import { Box } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 99,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "64px",
          height: "64px",
          border: "8px solid",
          borderColor: "primary.main transparent #555 transparent",
          borderRadius: "50%",
          animation: "spin 1.2s linear infinite",
        }}
      />
    </Box>
  );
};

export default Spinner;
