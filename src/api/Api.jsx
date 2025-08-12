import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getApiData = (pageNumber) => {
  return api.get(`/posts?_start=${pageNumber}&_limit=3`);
};

export const getIndvApiData = (id) => {
  return api.get(`/posts/${id}`);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

export const UpdatePost = ({ id, title, body }) => {
  return api.patch(`/posts/${id}`, { title, body });
};
