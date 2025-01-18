import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { register, reset } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    identificationType: "",
  });

  const { name, email, password, phone, address, identificationType } =
    formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/home");
    }
    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, user, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      phone,
      address,
      identificationType,
    };
    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f4f4"
    >
      <Box
        maxWidth={400}
        width="100%"
        p={4}
        bgcolor="white"
        boxShadow={3}
        borderRadius={2}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Get started with our platform by creating your account.
          </Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
            type="email"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={phone}
            onChange={onChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
            type="password"
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="identificationType-label">
              Identification Type
            </InputLabel>
            <Select
              labelId="identificationType-label"
              name="identificationType"
              value={identificationType}
              onChange={onChange}
              required
            >
              <MenuItem value="driver license">Driver License</MenuItem>
              <MenuItem value="passport">Passport</MenuItem>
              <MenuItem value="national ID">National ID</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Address"
            name="address"
            value={address}
            onChange={onChange}
            fullWidth
            margin="normal"
            required
          />
          <Box mt={3}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Register
            </Button>
          </Box>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
