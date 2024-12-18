import * as axios from "@/service/axios";
import { LOGIN_URL } from "@/api/constant";

async function loginHome(params) {
  return new Promise((resolve, reject) => {
    axios
      .POST(LOGIN_URL, params)
      .then((res) => {
        if (res && res.data.code === 200) {
          localStorage.setItem('user', JSON.stringify(res.data.result))
          localStorage.setItem('token', res.data.result.token)
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
