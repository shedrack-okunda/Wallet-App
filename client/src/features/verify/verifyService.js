import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const verifyUser = async (data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.put(
    baseURL + `/api/users/verify/${data._id}`,
    {
      isVerified: data.isVerified,
    },
    config
  );
  return res.data;
};

const verifyService = { verifyUser };
export default verifyService;
