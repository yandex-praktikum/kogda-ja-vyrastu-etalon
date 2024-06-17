import { config } from 'dotenv';
import * as keypath from 'keypath';

config();

function createConfig() {
  console.log(process.env.MONGO_HOST);
  
  const configuration = {
    server: {
      port: process.env.SERVER_PORT || 3000,
    },
    database: {
      host: process.env.MONGO_HOST || 'localhost',
      port: process.env.MONGO_PORT || '27017',
      user: process.env.MONGO_USER || '',
      password: process.env.MONGO_PASSWORD || '',
      database: process.env.MONGO_DATABASE || 'kogdavirastu',
    },
    jwt: {
      accessSecret:
        process.env.JWT_ACCESS_TOKEN_SECRET || 'access_token_secret',
      accessTtl: process.env.JWT_ACCESS_TOKEN_TTL || 5 * 60,
      refreshSecret:
        process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_token_secret',
      refreshTtl: process.env.JWT_REFRESH_TOKEN_TTL || 30 * 60,
    },
  };

  return {
    get<T = any>(path: string, defaultValue?: T): T {
      return keypath(path, configuration) ?? defaultValue;
    },
  };
}

export default createConfig();
