export const LocalStorageKeys = {
  access_token: 'access_token',
};

export function GetAccessToken() {
  return localStorage.getItem(LocalStorageKeys.access_token);
}
