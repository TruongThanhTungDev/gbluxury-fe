import * as axios from "@/service/axios";
import { MENU_CONFIG_URL } from "./constant";
async function addNewConfig(params) {
  return new Promise((resolve, reject) => {
    axios
      .POST(MENU_CONFIG_URL + "/custom/create", params)
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

async function editConfig(params) {
  return new Promise((resolve, reject) => {
    axios
      .PUT(MENU_CONFIG_URL + "/custom/update", params)
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

async function getConfig() {
  return new Promise((resolve, reject) => {
    axios
      .GET(MENU_CONFIG_URL + "/search/custom")
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
async function getConfigClient() {
  return new Promise((resolve, reject) => {
    axios
      .GET(MENU_CONFIG_URL + "/client/search/custom")
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
export { addNewConfig, getConfig, editConfig, getConfigClient };