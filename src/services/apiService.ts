import axios from "axios";
import { IEmployee } from "../interfaces";

const baseUrl = "http://localhost:3001/api/v1";

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

export const deleteEmployee = (id: number, deletedAt: any, token: string) => {
  return axios.delete(`${baseUrl}/employees/${id}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
    data: { id, deletedAt },
  });
};

export const createEmployee = (employee: IEmployee, token: string) => {
  return axios.post(`${baseUrl}/employees`, employee, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
};

export const editEmployee = (employee: IEmployee, token: string) => {
  return axios.put(
    `${baseUrl}/employees/${employee.Id}`,
    { employee },
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );
};

export const getPositions = (token: string) => {
  return axios.get(`${baseUrl}/positions`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
};
