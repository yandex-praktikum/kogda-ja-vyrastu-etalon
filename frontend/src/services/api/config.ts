import { AxiosRequestConfig } from 'axios/index';

export const BASE_URL = process.env.API_ROOT || 'http://localhost:3000';

export const DEFAULT_CONFIG: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  },
};
