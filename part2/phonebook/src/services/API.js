import axios from "axios";
const baseUrl = "/api/persons";

const getAllPerson = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const createPerson = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const updatePerson = (person, id) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then((response) => response.data);
};

const API = {
  getAllPerson,
  createPerson,
  deletePerson,
  updatePerson,
};

export default API;
