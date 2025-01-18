import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, sendMoney } from "../../features/transactions/transactionSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Loader from "../loader/Loader";

const SendModal = ({ setSendModalOpen, receiverId }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.auth.user);
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.transact
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Money sent successfully");
      setSendModalOpen(false);
    }
    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, setSendModalOpen]);

  const [formData, setFormData] = useState({
    sender: _id,
    receiver: receiverId,
    amount: "",
    transactionType: "",
    reference: "",
  });

  const { sender, receiver, amount, transactionType, reference } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      sender,
      receiver,
      amount,
      transactionType,
      reference,
    };
    dispatch(sendMoney(transactionData));
  };

  const handleClose = () => {
    setSendModalOpen(false);
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DialogTitle>
            <Typography variant="h6">Send Money</Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <form onSubmit={onSubmit}>
              <TextField
                fullWidth
                label="Sender Account Number"
                name="sender"
                value={sender}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="Receiver Account Number"
                name="receiver"
                value={receiver}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={amount}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                inputProps={{ min: 1, max: 100000 }}
                required
              />
              <TextField
                fullWidth
                select
                label="Transaction Type"
                name="transactionType"
                value={transactionType}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                required
              >
                <MenuItem value="payment">Payment</MenuItem>
                <MenuItem value="transfer">Transfer</MenuItem>
                <MenuItem value="deposit">Deposit</MenuItem>
                <MenuItem value="refund">Refund</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="Reference"
                name="reference"
                value={reference}
                onChange={onChange}
                margin="normal"
                variant="outlined"
                required
              >
                <MenuItem value="transaction ID">Transaction ID</MenuItem>
                <MenuItem value="payment reference">Payment Reference</MenuItem>
              </TextField>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  Send
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default SendModal;
