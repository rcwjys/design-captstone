import axiosInstance from "../../axios";

export const report = async (reportData) => {
  try {
    const response = await axiosInstance.post("/reports", reportData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data)

    throw error;
  }
};
