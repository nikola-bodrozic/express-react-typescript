import axios, { AxiosInstance } from 'axios';

const host = `http://${process.env.REACT_APP_NODE_IP}`;
const apiUrl = "/api/v1";
const baseURL = `${host}${apiUrl}`;
export const axiosClient: AxiosInstance = axios.create({
	baseURL,
	timeout: 3000
});