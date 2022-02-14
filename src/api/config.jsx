import axios from "axios";

const API = "http://localhost:4000/api";

export const getAppointments = async () => {
  const { data } = await axios.get(`${API}/appointments`);
  return data;
};

export const createNewAppointment = async (appointment) => {
  const { data } = await axios.post(`${API}/appointments`, appointment);
  return data;
};

export const editAppointment = async ([id, appointment]) => {
  const { data } = await axios.put(`${API}/appointments/${id}`, appointment);
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axios.delete(`${API}/appointments/${id}`);
  return data;
};
