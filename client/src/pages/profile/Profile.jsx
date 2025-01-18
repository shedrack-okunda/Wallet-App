import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Paper,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Profile = () => {
  const dispatch = useDispatch();
  const { name, _id, image } = useSelector((state) => state.auth.user);

  const [file, setFile] = useState("");
  const [photo, setPhoto] = useState("");

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: _id,
      photo: photo,
    };
    dispatch(data);
  };

  return (
    <Box display="flex" width="100%">
      <Sidebar />
      <Box flex={6}>
        <Navbar />
        <Box p={3} display="flex" gap={3}>
          {/* Profile Photo Section */}
          <Paper
            elevation={3}
            sx={{
              flex: 2,
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              color="textSecondary"
              mb={2}
              textAlign="center"
            >
              {name}
            </Typography>
            {photo ? (
              <Avatar
                src={photo}
                alt="Uploaded photo"
                sx={{ width: 200, height: 200 }}
              />
            ) : image ? (
              <Avatar
                src={image}
                alt="Profile photo"
                sx={{ width: 200, height: 200 }}
              />
            ) : (
              <AccountCircle
                sx={{
                  width: 200,
                  height: 200,
                  color: "rgba(116, 81, 248, 0.5)",
                }}
              />
            )}
            {!image && (
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e)}
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Button variant="contained" component="label">
                  Upload Photo
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    hidden
                    onChange={(e) => handleChange(e)}
                  />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Upload
                </Button>
              </Box>
            )}
          </Paper>

          {/* Profile Details Section */}
          <Paper elevation={3} sx={{ flex: 6, p: 3 }}>
            <Typography variant="h5" mb={3}>
              Details
            </Typography>
            <Box
              component="form"
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={2}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                label="Name"
                name="name"
                id="name"
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                id="email"
                required
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                id="phone"
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                id="password"
                required
                fullWidth
              />
              <TextField
                label="Address"
                name="address"
                id="address"
                required
                fullWidth
              />
              <Box gridColumn="span 2" textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 4 }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
