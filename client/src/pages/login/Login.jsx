import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { login, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate("/home");
    }
    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, user, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontWeight: 500,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        {/* Header */}
        <Box textAlign="center" marginBottom="2rem">
          <Typography
            variant="h4"
            marginBottom="0.5rem"
            textTransform="capitalize"
          >
            Hello Again
          </Typography>
          <Typography color="textSecondary">
            Welcome Back! You have been missed
          </Typography>
        </Box>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <Box marginBottom="1.25rem">
            <TextField
              fullWidth
              type="email"
              name="email"
              id="email"
              label="Email"
              value={email}
              onChange={onChange}
              placeholder="Please enter email"
              required
            />
          </Box>
          <Box marginBottom="1.25rem">
            <TextField
              fullWidth
              type="password"
              name="password"
              id="password"
              label="Password"
              value={password}
              onChange={onChange}
              placeholder="Please enter password"
              required
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              padding: "0.75rem 0",
              textTransform: "capitalize",
              letterSpacing: "1px",
              marginBottom: "1rem",
            }}
          >
            Login
          </Button>
          <Typography
            textAlign="center"
            color="textSecondary"
            fontSize="0.875rem"
          >
            Not registered yet?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "underline",
                color: "#1976d2",
              }}
            >
              Create an account
            </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
