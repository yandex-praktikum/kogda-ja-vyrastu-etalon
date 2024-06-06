/* eslint-disable camelcase */

enum StorageKey {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
}

export const set = (tokens: { access_token: string, refresh_token: string }) => {
  localStorage.setItem(StorageKey.AccessToken, tokens.access_token);
  localStorage.setItem(StorageKey.RefreshToken, tokens.refresh_token);
};

export const get = (): { accessToken: string | null, refreshToken: string | null } => ({
  accessToken: localStorage.getItem(StorageKey.AccessToken),
  refreshToken: localStorage.getItem(StorageKey.RefreshToken),
});

export const remove = () => {
  localStorage.removeItem(StorageKey.AccessToken);
  localStorage.removeItem(StorageKey.RefreshToken);
};
