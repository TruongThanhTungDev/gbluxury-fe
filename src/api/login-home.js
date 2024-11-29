import { encodeValue } from "@/service/crypto";
import * as axios from "@/service/axios";
import { AUTH_URL } from "@/api/constant";
import cookies from "js-cookie";

async function loginHome(params) {
  return new Promise((resolve, reject) => {
    axios
      .POST(AUTH_URL + "/log-in", params)
      .then((res) => {
        if (res && res.status === 200) {
          const data = res.data;
          const token = {
            accessToken: data.token,
            refreshToken: data.refreshToken,
          };
          cookies.set("_user", encodeValue(JSON.stringify(data)), {
            expires: 7,
          });
          cookies.set("_t", encodeValue(JSON.stringify(token)), {
            expires: 7,
          });
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
async function signUp() {
  
}

export { loginHome, signUp };
