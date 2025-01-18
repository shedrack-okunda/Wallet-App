import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  addBalance,
  reset,
} from "../../features/transactions/transactionSlice";
import Loader from "../loader/Loader";

const AddMoneyModal = ({ setAddMoneyModal }) => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, moneyAdded, isError, message } = useSelector(
    (state) => state.transact
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(moneyAdded.msg);
      setAddMoneyModal(false);
    }
    dispatch(reset());
  }, [isError, message, isSuccess]);

  const addMoneyClose = () => {
    setAddMoneyModal(false);
  };

  const [formData, setFormData] = useState({
    amount: "",
  });

  const { amount } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      amount,
    };
    dispatch(addBalance(data));
  };

  return (
    <Modal
      open={true}
      onClose={addMoneyClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 600,
          p: 3,
          borderRadius: "10px",
          outline: "none",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h1">
                Add Money
              </Typography>
              <IconButton
                onClick={addMoneyClose}
                sx={{ backgroundColor: "#f6f6f6" }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>

            <Box sx={{ mt: 4, mb: 4 }}>
              <form
                onSubmit={onSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="amount"
                    sx={{ display: "block", mb: 1 }}
                  >
                    Amount
                  </Typography>
                  <TextField
                    id="amount"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={onChange}
                    placeholder="$1000"
                    inputProps={{ min: 1, max: 100000 }}
                    required
                    fullWidth
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    alignSelf: "flex-end",
                    backgroundColor: "#1976d2",
                    ":hover": { backgroundColor: "#155a9f" },
                  }}
                >
                  Add
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AddMoneyModal;
