import axios, { AxiosInstance } from 'axios';
const host = "http://localhost:3008";
const apiUrl = "/api/v1";
const baseURL: string =`${host}${apiUrl}`;
console.log("React env. variable: ", process.env.REACT_APP_NODE_IP)
export const axiosClient: AxiosInstance = axios.create({
	baseURL,
	timeout: 2000,
	headers: {
		MyHeader: 'MyValue',
	},
});