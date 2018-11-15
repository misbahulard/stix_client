import axios from 'axios';

export const BASE_API_URL = 'http://localhost:5000/api/v1';
export const API_URL_LOGIN = BASE_API_URL + '/login';
export const API_URL_LOGOUT = BASE_API_URL + '/logout/access'
export const API_URL_REFRESH_TOKEN = BASE_API_URL + '/token/refresh'
export const API_URL_OBSERVED_DATA = BASE_API_URL + '/observed-datas';
export const API_URL_INDICATOR = BASE_API_URL + '/indicators';
export const API_URL_IDENTITY = BASE_API_URL + '/identities';
export const API_URL_THREAT_ACTOR = BASE_API_URL + '/threat-actors';
export const API_URL_ATTACK_PATTERN = BASE_API_URL + '/attack-patterns';
export const API_URL_BUNDLES = BASE_API_URL + '/bundles';

export function setHeader(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function setToken(token) {
  var res = localStorage.setItem('token', token);
  if (res != null)
    return true;
  else
    return false;
}

export function setRefreshToken(token) {
  var res = localStorage.setItem('refresh_token', token);
  if (res != null)
    return true;
  else
    return false;
}

export function setRefreshTime(delay = 15) {
  var res = localStorage.setItem('refresh_time', new Date(new Date().getTime() + delay * 60000).getTime())
  if (res != null)
    return true;
  else
    return false;
}

export function getToken(jwt) {
  return localStorage.getItem('token');
}

export function getRefreshToken(jwt) {
  return localStorage.getItem('refresh_token');
}

export function getRefreshTime() {
  return localStorage.getItem('refresh_time');
}

export function checkAuth() {
  if (getToken() != null)
    return true;
  else
    return false;
}

export function destroySession() {
  localStorage.clear()
}