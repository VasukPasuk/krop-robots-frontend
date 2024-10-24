const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api"
import axios, {CreateAxiosDefaults} from 'axios';

const config:CreateAxiosDefaults = {
  baseURL: API_URL,
  withCredentials: true,
}

export const axiosBasic = axios.create(config);
