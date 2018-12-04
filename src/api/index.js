/**
 * api/index.js
 * berfungsi sebagai tempat untuk bantuan pemanggilan API seperti url dan fungsi yang berkaitan
 * @module api/route
 * @returns {*}
 */
import axios from 'axios';

/**
 * Berisi daftar url penting dari API backend
 */
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

/**
 * setel header axios ke mode Authorization menggunakan token JWT
 * @param {string} token - string yang berisi token jwt
 */
export function setHeader(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

/**
 * simpan username pengguna ke local storage dengan nama 'username'
 * @param {string} username - string yang berisi username pengguna
 * @returns {boolean} status dari hasil simpan
 */
export function setUsername(username) {
  var res = localStorage.setItem('username', username)
  if (res != null)
    return true;
  else
    return false;
}

/**
 * ambil username pengguna dari local storage
 * @returns {string} username dari pengguna
 */
export function getUsername() {
  return localStorage.getItem('username');
}

/**
 * simpan token JWT ke local storage dengan nama 'token'
 * @param {string} token - string yang berisi token JWT
 * @returns {boolean} status dari hasil simpan
 */
export function setToken(token) {
  var res = localStorage.setItem('token', token);
  if (res != null)
  return true;
  else
  return false;
}

/**
 * ambil token JWT dari local storage
 * @returns {string} token jwt
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * simpan refresh token JWT ke local storage dengan nama 'refresh_token'
 * @param {string} token - string yang berisi refresh token JWT
 * @returns {boolean} status dari hasil simpan
 */
export function setRefreshToken(token) {
  var res = localStorage.setItem('refresh_token', token);
  if (res != null)
    return true;
  else
    return false;
}

/**
 * ambil refresh token JWT dari local storage
 * @returns {boolean} status dari hasil simpan
 */
export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

/**
 * simpan waktu tunda (delay) untuk refresh ke dalam local storage dengan nama 'refresh_time'
 * @param {int} delay - waktu tunda dalam satuan detik
 */
export function setRefreshTime(delay = 60) {
  var res = localStorage.setItem('refresh_time', new Date(new Date().getTime() + delay * 60000).getTime())
  if (res != null)
    return true;
  else
    return false;
}

/**
 * ambil waktu refresh dari local storage
 * @returns {boolean} status dari hasil simpan
 */
export function getRefreshTime() {
  return localStorage.getItem('refresh_time');
}

/**
 * cek autentikasi pengguna dengan bantuan fungsi @function getToken
 * @returns {boolean} status dari hasil pengecekan
 */
export function checkAuth() {
  if (getToken() != null)
    return true;
  else
    return false;
}

/**
 * hancurkan semua isi dari local storage
 */
export function destroySession() {
  localStorage.clear()
}