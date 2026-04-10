import api from "./axios";

export const getSummary = () => {
  return api.get("/dashboard/summary");
};