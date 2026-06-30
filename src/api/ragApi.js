import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
// src/api/ragApi.js

// Upload PDF
export const uploadPDF = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Ask Question
export const askQuestion = async (question) => {
  const response = await api.post("/chat", {
    question,
  });

  return response.data;
};
