import axios from 'axios';

const API_URL = 'http://localhost:7104/api/Category'; // עדכן לפי הכתובת של השרת שלך

const CategoryService = {
  // Get all categories
  getAll: async () => {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  },

  // Get category by ID
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  },

  // Add a new category
  add: async (category) => {
    const response = await axios.post(`${API_URL}/add`, category);
    return response.data;
  },

  // Update category
  update: async (id, category) => {
    const response = await axios.put(`${API_URL}/update/${id}`, category);
    return response.data;
  },

  // Delete category
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/delete`, {
      params: { id }
    });
    return response.data;
  }
};

export default CategoryService;
