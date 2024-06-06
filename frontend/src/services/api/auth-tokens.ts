/* eslint-disable camelcase */
import axios from 'axios';
import { DEFAULT_CONFIG } from './config';

export interface Tokens {
  access_token: string;
  refresh_token: string;

  token_type: 'bearer';

  expires_in: number;
}

export interface CreateTokenDto {
  email: string;
  password: string;
}

/**
 * We have to create instance manually to avoid circular deps
 */
const authTokensAPI = axios.create({
  ...DEFAULT_CONFIG,
  baseURL: `${DEFAULT_CONFIG.baseURL!}/auth-tokens`,
});

export const post = (createTokenDto: CreateTokenDto) => authTokensAPI.post<Tokens>('', createTokenDto).then(({ data }) => data);

export const patch = (refreshToken: string) => authTokensAPI.patch<Tokens>('', null, { headers: { Authorization: `Bearer ${refreshToken}` } }).then(({ data }) => data);
