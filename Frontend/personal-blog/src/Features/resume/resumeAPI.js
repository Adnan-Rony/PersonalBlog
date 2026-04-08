import axiosInstance from "../../api/axiosInstance.js";

export const fetchResume = async () => {
  const res = await axiosInstance.get("/resume");
  return res.data;
};

export const createResume = async (data) => {
  const res = await axiosInstance.post("/resume", data);
  return res.data;
};

export const updateResume = async (data) => {
  const res = await axiosInstance.put("/resume", data);
  return res.data;
};

export const updateResumeSection = async ({ section, data }) => {
  const res = await axiosInstance.patch("/resume/section", { section, data });
  return res.data;
};

export const updatePdfLink = async ({ pdfUrl }) => {
  const res = await axiosInstance.patch("/resume/pdf", { pdfUrl });
  return res.data;
};
