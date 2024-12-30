import axiosInstance from "../../axios";

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/account", userData);
    localStorage.setItem("userData", response.data.data.user_id);
    console.log(response.data.data);
    return response.data.data
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};

export const isAuthenticated = () => {
  try {
    const accessUserId = localStorage.getItem("userData");
    return !(!accessUserId);
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async() => {
  try {
    const accessUserId = localStorage.getItem("userData");

    const response = await axiosInstance.get(`/account/${accessUserId}`);
    return response.data.data
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async(userId) => {
  try {
    const response = await axiosInstance.get(`/account/points/${userId}`);
    console.log('response data',response)
    return response.data.data
  } catch (error) {
    console.log('eror service',error.response.data.message);
    throw error.response.data.message
  }
};

export const getPointData = async(userId) => {
  try {
    const response = await axiosInstance.get(`/account/points/${userId}`);
    console.log('response service',response)
    return response.data.data.point
  } catch (error) {
    console.log('eror service',error.response.data.message);
    throw error.response.data.message
  }
};
