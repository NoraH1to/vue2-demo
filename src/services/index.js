import axios from 'axios';

const Service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL ?? '',
});
Service.interceptors.request.use((config) => config);
Service.interceptors.response.use((response) => {
  if (process.env.VUE_APP_MOCK || response.data.code === 200)
    return response.data.data;
  return Promise.reject(response);
});

export const GET = (url, params) => Service({ url, method: 'GET', params });

export const POST = (url, data, form = false) => {
  let result;
  if (form) {
    let result = new FormData();
    Object.entries().forEach(([key, value]) => result.append(key, value));
  } else {
    result = data;
  }
  return Service({ url, method: 'POST', data: result });
};

export default Service;
