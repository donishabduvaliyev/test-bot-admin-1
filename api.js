import axios from "axios";

const API_URL = "https://test-admin-server-unrz.onrender.com/api"; // Change to your backend URL when deployed

export const addFoodItem = async (formData) => {
  return await axios.post(`${API_URL}/food/add`, formData);
};

export const getFoodItems = async () => {
  return await axios.get(`${API_URL}/food`);
};

export const updateFoodItem = async (id, updatedData) => {
  return await axios.put(`${API_URL}/food/edit/${id}`, updatedData);
};

export const deleteFoodItem = async (id) => {
  return await axios.delete(`${API_URL}/food/delete/${id}`);
};



