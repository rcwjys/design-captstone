import axiosInstance from "../../axios";

export const report = async (reportData) => {
  try {
    const response = await axiosInstance.post("/reports", reportData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    console.log(error.response.data)

    throw error;
  }
};

export const getReport = async (userId = null) => {
  try {
    const url = userId ? `/reports?user_id=${userId}` : "/reports";
    const reponse = await axiosInstance.get(url);
    console.log(reponse)
    return reponse.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReportById = async (reportId) => {
  try {
    const response = await axiosInstance.get(`/reports/${reportId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const claimReward = async (rewardData) => {
  try {
    const response = await axiosInstance.post(`/claims`, rewardData);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw error.response.data.message;
  }
};
