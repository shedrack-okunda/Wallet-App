import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const sendMoney = async (transactionData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.post(
    baseURL + "/api/transfer",
    transactionData,
    config
  );
  return res.data;
};

const getTransactions = async (userId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.get(
    baseURL + "/api/get-transactions/" + userId,
    config
  );
  return res.data;
};

const getMoneySend = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.get(baseURL + "/api/get-money-send", config);
  return res.data;
};

const getMoneyReceived = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.get(baseURL + "/api/get-money-receive", config);
  return res.data;
};

const addMoney = async (data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.post(
    baseURL + "/api/deposit",
    { amount: data.amount },
    config
  );
  return res.data;
};

const transactionService = {
  sendMoney,
  getTransactions,
  getMoneySend,
  getMoneyReceived,
  addMoney,
};

export default transactionService;
