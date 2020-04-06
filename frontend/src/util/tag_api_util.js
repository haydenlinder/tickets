import axios from 'axios';

export const getTags = () => (
  axios.get(`/api/tags`)
);

export const getTag = name => (
  axios.get(`/api/tags/${name}`)
);

export const createTag = tag => (
  axios.post(`/api/tags`, tag)
);
