import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3rem",
        color: "primary.main",
      }}
    >
      {/* Header */}
      <Typography
        variant="h1"
        fontSize="3rem"
        color="primary.main"
        textAlign="center"
      >
        404 - Not Found
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        fontSize="1.25rem"
        color="textSecondary"
        textAlign="center"
        marginTop="1rem"
      >
        The requested page could not be found.
      </Typography>

      {/* Link to Home */}
      <Button
        component={Link}
        to="/home"
        variant="contained"
        color="primary"
        sx={{
          marginTop: "1.5rem",
          fontSize: "1rem",
          fontWeight: "bold",
          textDecoration: "none",
          padding: "0.75rem 2rem",
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
