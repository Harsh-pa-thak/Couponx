import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

// Fetch all coupons
export const fetchCoupons = async () => {
  try {
    const response = await axios.get(`${API_URL}/coupons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
};

// Add a new coupon
export const addCoupon = async (couponData) => {
  try {
    const response = await axios.post(`${API_URL}/add-coupon`, couponData);
    return response.data;
  } catch (error) {
    console.error("Error adding coupon:", error);
    return null;
  }
};

// Buy a coupon
export const buyCoupon = async (couponId) => {
  try {
    const response = await axios.post(`${API_URL}/buy-coupon`, { couponId });
    return response.data;
  } catch (error) {
    console.error("Error buying coupon:", error);
    return null;
  }
};
