import axios from "axios";

const baseUrl = "https://elite-dev-test-api.azurewebsites.net/";

export const getContacts = () => {
  return axios.get(`${baseUrl}api/contact`);
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
