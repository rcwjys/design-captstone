import axiosInstance from "../../axios";

export const register = async (staffData) => {
  try {
    const response = await axiosInstance.post("/staffs", staffData);
    console.log(response);
    localStorage.setItem("staffId", response.data.data.id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const login = async (staffData) => {
  try {
    const response = await axiosInstance.post("/staffs/auth", staffData);
    localStorage.setItem("staffId", response.data.data.staff_id);
    console.log(response.data.data.staff_id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReport = async () => {
  try {
    const reponse = await axiosInstance.get("/reports");
    return reponse.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createProgres = async (progresData) => {
  try {
    const response = await axiosInstance.post("/process", progresData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProgres = async () => {
  try {
    const response = await axiosInstance.get("/process");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProgres = async (progresData) => {
  try {
    const response = await axiosInstance.patch("/process", progresData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createReward = async (rewardData) => {
  try {
    const response = await axiosInstance.post("/rewards", rewardData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReward = async () => {
  try {
    const response = await axiosInstance.get("/rewards");
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRewardById = async (id) => {
  try {
    const response = await axiosInstance.get(`/rewards/${id}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatedReward = async (rewardData, id) => {
  try {
    const response = await axiosInstance.patch(`/rewards/${id}`, rewardData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
