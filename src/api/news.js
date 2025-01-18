import * as axios from "@/service/axios";
import { NEW_URL } from "./constant";
async function addNews(params) {
  return new Promise((resolve, reject) => {
    axios
      .POST(NEW_URL + "/custom/create", params)
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => reject(err));
  });
}
async function getNewsAdmin(params) {
  return new Promise((resolve, reject) => {
    axios
      .GET(NEW_URL + "/search/custom", params)
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => reject(err));
  });
}
async function getDetailNewsAdmin(id) {
  return new Promise((resolve, reject) => {
    axios
      .GET(NEW_URL + "/detail?id=" + id, "")
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => reject(err));
  });
}
export { addNews, getNewsAdmin, getDetailNewsAdmin };
