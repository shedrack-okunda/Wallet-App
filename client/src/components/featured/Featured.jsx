import React from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Box, Typography, IconButton, Grid } from "@mui/material";

const Featured = () => {
  return (
    <Box
      sx={{
        flex: 2,
        boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.3)",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "gray",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 500 }}>
          Total Revenue
        </Typography>
        <IconButton size="small">
          <MoreVertRounded fontSize="small" />
        </IconButton>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          padding: "20px",
        }}
      >
        {/* Chart */}
        <Box
          sx={{
            width: "100px",
            height: "100px",
          }}
        >
          <CircularProgressbar value={70} text={"70%"} strokeWidth={4} />
        </Box>

        {/* Info Text */}
        <Typography sx={{ fontWeight: 500, color: "gray" }}>
          Total sales made today
        </Typography>
        <Typography
          sx={{
            fontSize: "1.875rem",
            fontWeight: 600,
          }}
        >
          $420
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "0.75rem",
            color: "gray",
            textAlign: "center",
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
          itaque tenetur dolorum iusto?
        </Typography>

        {/* Summary */}
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Item 1 */}
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: "0.875rem", color: "gray", fontWeight: 500 }}
            >
              Target
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
                color: "green",
                fontSize: "0.875rem",
              }}
            >
              <KeyboardArrowUpRounded fontSize="small" />
              <Typography>$12.4k</Typography>
            </Box>
          </Grid>

          {/* Item 2 */}
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: "0.875rem", color: "gray", fontWeight: 500 }}
            >
              Last Week
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
                color: "red",
                fontSize: "0.875rem",
              }}
            >
              <KeyboardArrowDownRounded fontSize="small" />
              <Typography>$12.4k</Typography>
            </Box>
          </Grid>

          {/* Item 3 */}
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: "0.875rem", color: "gray", fontWeight: 500 }}
            >
              Last Month
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
                color: "red",
                fontSize: "0.875rem",
              }}
            >
              <KeyboardArrowDownRounded fontSize="small" />
              <Typography>$12.4k</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Featured;
