import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%", // Adjust based on container height
        color: "primary.main", // Replace with your theme's primary color
      }}
    >
      <CircularProgress sx={{ color: "primary.main" }} />
    </Box>
  );
};

export default Loader;
