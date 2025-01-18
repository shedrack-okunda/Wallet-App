import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const requestMoney = async (requestData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.post(baseURL + "/api/request", requestData, config);
  return res.data;
};

const requestSend = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.get(baseURL + "/api/request-send", config);
  return res.data;
};

const requestReceived = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.post(baseURL + "/api/request-received", config);
  return res.data;
};

const updateRequestStatus = async (updatedRequest, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.post(
    baseURL + "/api/update-request-status",
    updatedRequest,
    config
  );
  return res.data;
};

const requestService = {
  requestMoney,
  requestSend,
  requestReceived,
  updateRequestStatus,
};
export default requestService;
