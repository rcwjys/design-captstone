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
    if (!accessUserId) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};
