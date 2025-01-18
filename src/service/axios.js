import axios from "axios";
import { API_URL } from "@/api/constant";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000000,
  headers: { "Content-Type": "application/json, text/plain" },
});

instance.interceptors.request.use;

async function GET(url, params) {
  let result = await instance
    .get(url, { params: { ...params } })
    .then((res) => res.data)
    .catch((err) => err.response);
  return result;
}

async function POST(url, body, config = {}) {
  let result = instance
    .post(
      url,
      { ...body },
      {
        ...(config?.type === "upload"
          ? {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          : config),
      }
    )
    .then((res) => res)
    .catch((err) => err);
  return result;
}

async function PUT(url, body) {
  let result = instance
    .put(url, { ...body })
    .then((res) => res)
    .catch((err) => err.response);
  return result;
}

async function DELETE(url, params) {
  let result = await instance
    .delete(url, { params: { ...params } })
    .then((response) => {
      return response;
    });
  return result;
}

instance.interceptors.request.use(
  (config) => {
    const _t = localStorage.getItem('token')
    if (_t) {
      config.headers.Authorization = `Bearer ${_t}`;
    }
    return config;
  },
  (error) => {
    console.error(error)
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) console.error(error);
    else return error;
  }
);

export { GET, PUT, POST, DELETE };
