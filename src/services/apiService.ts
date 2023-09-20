import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/clinica";

export const getEmployees = () => {
  return axios.get(`${baseUrl}/employees`);
};

// export const deleteContacts = (id) => {
//   return axios.delete(`${baseUrl}api/contact/${id}`);
// };

// export const createContact = (contact) => {
//   return axios.post(`${baseUrl}api/contact`, contact);
// };

// export const editContact = (contact) => {
//   return axios.put(`${baseUrl}api/contact/${contact.id}`, contact);
// };

// export const getContact = (id) => {
//   return axios.get(`${baseUrl}api/contact/${id}`);
// };
