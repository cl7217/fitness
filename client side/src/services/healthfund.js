import axios from "axios";

const baseUrl = 'https://localhost:7104';

// Get all health funds
export const getHealthFunds = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/HealthFund/get`, {
      validateStatus: (status) => status < 500
    });
    return { data: response.data, status: response.status };
  } catch (err) {
    throw err;
  }
};

// Get health fund by ID
export const getHealthFundById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/HealthFund/get/${id}`, {
      validateStatus: (status) => status < 500
    });
    return { data: response.data, status: response.status };
  } catch (err) {
    throw err;
  }
};

// Add health fund
export const addHealthFund = async (healthFund) => {
  try {
    const response = await axios.post(`${baseUrl}/api/HealthFund/add`, healthFund, {
      validateStatus: (status) => status < 500
    });
    return { data: response.data, status: response.status };
  } catch (err) {
    throw err;
  }
};

// Update health fund
export const updateHealthFund = async (id, healthFund) => {
  try {
    const response = await axios.put(`${baseUrl}/api/HealthFund/update/${id}`, healthFund, {
      validateStatus: (status) => status < 500
    });
    return { data: response.data, status: response.status };
  } catch (err) {
    throw err;
  }
};

// Delete health fund
export const deleteHealthFund = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/HealthFund/delete`, {
      params: { id },
      validateStatus: (status) => status < 500
    });
    return { status: response.status };
  } catch (err) {
    throw err;
  }
};
