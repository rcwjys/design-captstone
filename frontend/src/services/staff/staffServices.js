import axiosInstance from "../../axios";

export const login = async (staffData) => {
  try {
    const response = await axiosInstance.post("/staffs", staffData);
    console.log(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReport = async () => {
  try {
    const reponse = await axiosInstance.get("/reports");
    return reponse.data.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
