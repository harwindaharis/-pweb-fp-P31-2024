import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // URL backend Anda
});

export const fetchCrowdfunds = () => instance.get('/crowdfunds');
export const fetchCrowdfund = (id) => instance.get(`/crowdfunds/${id}`);
export const createCrowdfund = (data) => instance.post('/crowdfunds', data);
export const updateCrowdfund = (id, data) => instance.put(`/crowdfunds/${id}`, data);
export const deleteCrowdfund = (id) => instance.delete(`/crowdfunds/${id}`);