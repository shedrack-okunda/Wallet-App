import { Avatar, Box, InputBase, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { name, image, isAdmin } = useSelector((state) => state.auth.user);

  return (
    <Box
      sx={{
        height: "4rem",
        borderBottom: "0.5px solid rgb(231, 228, 228)",
        display: "flex",
        alignItems: "center",
        fontSize: "0.87rem",
        color: "#555555",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          px: 2,
        }}
      >
        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e5e5e5",
            borderRadius: "5px",
            backgroundColor: "rgba(201, 201, 201, 0.1)",
            px: 1,
            width: "30%",
          }}
        >
          <InputBase
            placeholder="Search..."
            sx={{
              flex: 1,
              fontWeight: 600,
              fontSize: "0.75rem",
              "&::placeholder": {
                fontSize: "0.75rem",
              },
            }}
          />
          <SearchRoundedIcon sx={{ fontSize: "1.25rem" }} />
        </Box>

        {/* User Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Avatar */}
          <Avatar
            src={image || ""}
            alt={name || "User Avatar"}
            sx={{
              width: 40,
              height: 40,
              marginRight: 2,
              backgroundColor: "#f5f5f5",
            }}
          />

          {/* User Info */}
          <Box>
            <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
            {isAdmin && (
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "gray", marginTop: "0.2rem" }}
              >
                Admin
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
