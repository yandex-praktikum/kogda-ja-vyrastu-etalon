/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { patch as refreshTokens } from './auth-tokens';
import { get, set } from '../auth';
import { BASE_URL, DEFAULT_CONFIG } from './config';

export const authInterceptor = (
  config: InternalAxiosRequestConfig<any>,
): InternalAxiosRequestConfig<any> => {
  const { accessToken } = get();

  if (!accessToken) {
    return config;
  }

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  } as InternalAxiosRequestConfig<any>;
};

export const refreshTokenInterceptor = async (error: AxiosError) => {
  const config = error?.config;

  if (!config) {
    return Promise.reject(error);
  }

  // @ts-ignore
  if (error?.response?.status === 401 && !config.sent) {
    // @ts-ignore
    config.sent = true;

    const { refreshToken } = get();

    if (!refreshToken) {
      return Promise.reject(error);
    }

    const tokens = await refreshTokens(refreshToken);

    set(tokens);

    return axios({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
  }

  return Promise.reject(error);
};

export default (path: string) => {
  const instance = axios.create({
    ...DEFAULT_CONFIG,
    baseURL: `${BASE_URL}${path}`,
  });

  instance.interceptors.request.use(authInterceptor);
  instance.interceptors.response.use((response) => response, refreshTokenInterceptor);

  return instance;
};
