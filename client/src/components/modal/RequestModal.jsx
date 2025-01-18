import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, sendRequest } from "../../features/request/requestSlice";

const RequestModel = ({ setRequestModalOpen, requestTo }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.auth.user);
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.request
  );

  const [formData, setFormData] = useState({
    receiver: requestTo,
    amount: "",
    description: "",
  });

  const { receiver, amount, description } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Request sent successfully");
      setRequestModalOpen(false);
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch]);

  const handleClose = () => setRequestModalOpen(false);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const transactionData = { receiver, amount, description };
    dispatch(sendRequest(transactionData));
  };

  return (
    <Modal
      open
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          width: 600,
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Request Fund</Typography>
              <IconButton onClick={handleClose}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 3,
              }}
            >
              <TextField
                label="Sender Account Number"
                variant="outlined"
                name="senderId"
                value={_id}
                onChange={onChange}
                placeholder="6258457d541d78c4fd14"
                fullWidth
                required
              />
              <TextField
                label="Receiver Account Number"
                variant="outlined"
                name="receiverId"
                value={receiver}
                onChange={onChange}
                placeholder="6258457d541d7148c4fd14"
                fullWidth
                required
              />
              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                name="amount"
                value={amount}
                onChange={onChange}
                placeholder="$1000"
                inputProps={{ min: 1, max: 100000 }}
                fullWidth
                required
              />
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                onChange={onChange}
                multiline
                rows={3}
                placeholder="Enter a description (max 20 characters)"
                inputProps={{ maxLength: 20 }}
                fullWidth
                required
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  alignSelf: "flex-end",
                  width: "30%",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Send
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RequestModel;
