import axios from 'axios';

export const BASE_API_URL = 'http://localhost:5000/api/v1';
export const API_URL_BUNDLES = BASE_API_URL + '/bundles';

export function setHeader() {
  var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNGE4NDhiYy1hNDI4LTQ3MmQtYTRhMC1mMDlkNjJmOTk0OGIiLCJleHAiOjE1NDEyNTc5MjYsImZyZXNoIjpmYWxzZSwiaWF0IjoxNTQxMjU3MDI2LCJ0eXBlIjoiYWNjZXNzIiwibmJmIjoxNTQxMjU3MDI2LCJpZGVudGl0eSI6ImFkbWluIn0.yihP2h2UhlbTRKzE-9gxT4xElkyt8f4Yfijho40YKAQ'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
}
