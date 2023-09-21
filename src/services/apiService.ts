import axios from "axios";
import { IEmployee } from "../interfaces";

const baseUrl = "http://localhost:3001/api/v1/clinica";

export const authenticate = (token: string) => {
  return axios.get(`${baseUrl}/employees/authenticate`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
};

export const getEmployees = (token: string) => {
  return axios.get(`${baseUrl}/employees`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
};

// export const deleteContacts = (id) => {
//   return axios.delete(`${baseUrl}api/contact/${id}`);
// };

export const createEmployee = (employee: IEmployee, token: string) => {
  return axios.post(
    `${baseUrl}/employees`,
    { employee },
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );
};

// export const editContact = (contact) => {
//   return axios.put(`${baseUrl}api/contact/${contact.id}`, contact);
// };

// export const getContact = (id) => {
//   return axios.get(`${baseUrl}api/contact/${id}`);
// };

export const getPositions = () => {
  const positions = [
    { Id: 1, Name: "Conserje", DepartmentId: 1 },
    { Id: 2, Name: "Desarrollador Senior", DepartmentId: 2 },
    { Id: 3, Name: "Desarrollador Junior", DepartmentId: 2 },
    { Id: 4, Name: "Jefe de Recursos Humanos", DepartmentId: 7 },
    { Id: 5, Name: "Asistente de Recursos Humanos", DepartmentId: 7 },
    { Id: 6, Name: "Auxiliar de Recursos Humanos", DepartmentId: 7 },
    { Id: 7, Name: "Jefe de Marketing", DepartmentId: 5 },
  ];
  return positions;
};
