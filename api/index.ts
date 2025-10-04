import axios from "axios";
const API = process.env.EXPO_PUBLIC_BACKEND_URL;

export const createCheckoutSession = async (
  handle: string,
  message: string,
  amount: number,
  anonymous: boolean
) => {
  const res = await axios.post(`${API}/api/create-checkout-session`, {
    handle,
    message,
    amount,
    anonymous,
  });
  return res.data;
};
