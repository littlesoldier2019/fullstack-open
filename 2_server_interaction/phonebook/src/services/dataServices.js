import axios from "axios";
const BASE_URL = "http://localhost:3001/persons";

export const getAll = () => {
  return axios.get(BASE_URL).then((response) => {
    return response.data;
  });
};

export const create = (newObject) => {
  return axios.post(BASE_URL, newObject).then((response) => {
    return response.data;
  });
};

export const deleteItem = (id) => {
  const param = `http://localhost:3001/persons/${id}`;
  return axios.delete(param);
};
