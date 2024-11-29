import axios from "axios";
import { decodeValue, encodeValue } from "@/service/crypto";
import cookies from "js-cookie";
import { API_URL } from "@/api/constant";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000000,
  headers: { "Content-Type": "application/json" },
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
    const _t = cookies.get("_t");
    if (_t) {
      const token = JSON.parse(decodeValue(_t));
      if (token && !isTokenExpired(token.accessToken)) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    handleRefreshToken(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) handleRefreshToken(error);
    else return error;
  }
);

export { GET, PUT, POST, DELETE };

const handleRefreshToken = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const _t = cookies.get("_t");
    let token;
    if (_t) token = JSON.parse(decodeValue(_t));

    if (token && !isTokenExpired(token.refreshToken)) {
      try {
        const refreshedToken = await refreshToken(
          token.accessToken,
          token.refreshToken
        );
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${refreshedToken.accessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshedToken.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        handleTokenExpiration();
      }
    } else {
      handleTokenExpiration();
    }
  }
  return console.error(error);
};

const refreshToken = async (token, refreshToken) => {
  const response = await axios.post(
    `${API_URL}/auth/refresh-token`,
    { refreshToken: refreshToken },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = response.data;
  const newToken = {
    accessToken: data.accessToken,
    refreshToken: refreshToken,
  };

  if (!newToken?.message) {
    cookies.set("_t", encodeValue(JSON.stringify(newToken)), {
      expires: 7,
    });
  }

  return newToken;
};

export function isTokenExpired(token, time = 0) {
  if (!token) return true;
  const tokenData = parseToken(token);
  if (!tokenData || !tokenData.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return tokenData.exp + time < currentTime;
}

function parseToken(token) {
  try {
    const tokenParts = token.split(".");
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload;
    }
  } catch (error) {
    console.error("Failed to parse token:", error);
  }
  return null;
}

const handleTokenExpiration = () => {
  cookies.remove("_t");
  cookies.remove("_user");
  localStorage.removeItem("_user");
  // window.location.href = "/";
};
